const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { ROLE_SHOP } = require('../common/constant')
const KeyTokenService = require('./keyToken.service')
const { createTokenPair } = require('../auth/authUtils')

class AccessService {
  static signUp = async ({ name, email, password }) => {
    debugger
    try {
      // step 1: check email exist
      const holderShop = await shopModel.findOne({ email }).lean()
      if (holderShop) {
        return {
          code: 'xxxx',
          message: 'Shop already registered!'
        }
      }

      const passwordHash = await bcrypt.hash(password, 10)

      const newShop = await shopModel.create({
        name, email, password: passwordHash, roles: [ROLE_SHOP.SHOP]
      })

      if (newShop) {
        // created privateKey, publicKey
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
          },
          privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
          }
        })

        const userId = newShop._id

        const publicKeyString = await KeyTokenService.createToken({
          userId,
          publicKey
        })

        if (!publicKeyString) {
          return {
            code: 'xxxx',
            message: 'publicKeyString error',
          }
        }

        const publicKeyObject = crypto.createPublicKey(publicKeyString)
        const tokens = await createTokenPair({ userId, email }, publicKey, privateKey)
        console.log('Create Token Success', tokens)

        return {
          code: 203,
          metadata: {
            shop: newShop,
            tokens
          }
        }
      }

      return {
        code: 200,
        metadata: null
      }
    } catch (error) {
      console.log(error)
      return {
        code: 'xxx',
        message: error.message,
        status: 'error'
      }
    }
  }
}

module.exports = AccessService