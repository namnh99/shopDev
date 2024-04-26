const bcrypt = require('bcrypt')
const crypto = require('crypto')
// Models
const ShopModel = require('../models/shop.model')
// Services
const KeyTokenService = require('./keyToken.service')
const ShopService = require('./shop.service')
// Ultis
const { getFileds } = require('../utils/builResponse')
const { createTokenPair, verifyJwtToken } = require('../auth/authUtils')
const { ConflictError, BadRequestError, AuthFailureError, ForbiddenError } = require('../core/error.response')
// Contants
const { ROLE_SHOP } = require('../common/constant')

class AccessService {
  /*
    1- check email in dbs
    2- create privateKey and publicKey
    3- save keys in dbs
    4- generate tokens by privateKey and publicKey
    5- get data return sign-up
  */
  static signUp = async ({ name, email, password }) => {
    const holderShop = await ShopModel.findOne({ email }).lean()
    if (holderShop) {
      throw new BadRequestError('Shop already registered!', 400)
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newShop = await ShopModel.create({
      name, email, password: passwordHash, roles: [ROLE_SHOP.SHOP]
    })

    if (newShop) {
      // Symmetric encryption - ma hoa doi xung
      const privateKey = crypto.randomBytes(64).toString('hex')
      const publicKey = crypto.randomBytes(64).toString('hex')

      const userId = newShop._id
      const keyStore = await KeyTokenService.createToken({ userId, publicKey, privateKey })

      if (!keyStore) {
        throw new BadRequestError('KeyStore error')
      }

      const tokens = await createTokenPair({ userId, email }, publicKey, privateKey)
      console.log('Create Token Success', tokens)

      return {
        shop: getFileds({ fileds: ['_id', 'name', 'email'], object: newShop }),
        tokens
      }
    }

    return null
  }

  /*
    1- check email in dbs
    2- match password
    3- create AT and RT and save
    4- generate tokens
    5- get data return login
  */
  static login = async ({ email, password, refreshToken = null }) => {
    const foundShop = await ShopService.findByEmail({ email })
    if (!foundShop) {
      throw new BadRequestError('Shop not registered!')
    }

    const match = await bcrypt.compare(password, foundShop.password)
    if (!match) {
      throw new AuthFailureError('Password not correct')
    }

    const privateKey = crypto.randomBytes(64).toString('hex')
    const publicKey = crypto.randomBytes(64).toString('hex')

    const userId = foundShop._id
    const tokens = await createTokenPair({ userId, email }, publicKey, privateKey)

    await KeyTokenService.createToken({ userId, publicKey, privateKey, refreshToken: tokens.refreshToken })

    return {
      shop: getFileds({ fileds: ['_id', 'name', 'email'], object: foundShop }),
      tokens
    }
  }

  /*
    1.logout
  */
  static logout = async ({ keyStore }) => {
    const result = await KeyTokenService.removeById(keyStore._id)
    console.log('result:::', result)
    return result
  }

  /*
    1. check tokeUsed?
    2. if used, clear all data KeyStore
    3. if not, verify token
    4. verify user
  */
  static handleRefreshToken = async (refreshToken) => {
    const foundToken = KeyTokenService.findByRefreshTokenUsed(refreshToken)
    if (foundToken) {
      // decode what user uses belong to this token
      const { userId, email } = verifyJwtToken(refreshToken, foundToken.privateKey)
      console.log('Warning user:::', { userId, email })
      await KeyTokenService.removeByUserId(userId)
      throw new ForbiddenError('Something went wrong! Please relogin')
    }

    const holderToken = await KeyTokenService.findByRefreshToken(refreshToken)
    if (!holderToken) throw new AuthFailureError('Shop not registered')
    //verify
    const { userId, email } = verifyJwtToken(refreshToken, holderToken.privateKey)
    console.log('verify user:::', { userId, email })

    const foundShop = ShopService.findByEmail({ email })
    if (!foundShop) throw new AuthFailureError('Shop not registered')
    
    // create new tokens
    const tokens = createTokenPair({ userId, email }, holderToken.publicKey, holderToken.privateKey)
    // update refreshTokenUsed
    await KeyTokenService.updateRefreshTokenUsed(userId, refreshToken)

    return tokens
  }
}

module.exports = AccessService