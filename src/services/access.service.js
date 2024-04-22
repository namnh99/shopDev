const bcrypt = require('bcrypt')
const crypto = require('crypto')
// Models
const ShopModel = require('../models/shop.model')
// Services
const KeyTokenService = require('./keyToken.service')
// Ultis
const { getFileds } = require('../utils/builResponse')
const { createTokenPair } = require('../auth/authUtils')
// Contants
const { ROLE_SHOP } = require('../common/constant')

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // step 1: check email exist
      const holderShop = await ShopModel.findOne({ email }).lean()
      if (holderShop) {
        return {
          code: 'xxxx',
          message: 'Shop already registered!'
        }
      }

      const passwordHash = await bcrypt.hash(password, 10)

      const newShop = await ShopModel.create({
        name, email, password: passwordHash, roles: [ROLE_SHOP.SHOP]
      })

      if (newShop) {
        // created privateKey, publicKey

        // // use RSA-ma hoa bat doi xung
        // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: 'spki',
        //     format: 'pem'
        //   },
        //   privateKeyEncoding: {
        //     type: 'pkcs8',
        //     format: 'pem'
        //   }
        // })

        // Symmetric encryption - ma hoa doi xung
        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')

        const userId = newShop._id
        const keyStore = await KeyTokenService.createToken({
          userId,
          publicKey,
          privateKey
        })

        if (!keyStore) {
          return {
            code: 'xxxx',
            message: 'keyStore error',
          }
        }

        const tokens = await createTokenPair({ userId, email }, publicKey, privateKey)
        console.log('Create Token Success', tokens)

        return {
          code: 203,
          metadata: {
            shop: getFileds({ fileds: ['_id', 'name', 'email'], object: newShop }),
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