const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { ROLE_SHOP } = require('../common/constant')

class AccessService {
  static signUp = async ({ name, email, password }) => {
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
        const { } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 400
          
        })
      }

    } catch (error) {
      return {
        code: 'xxx',
        message: error.message,
        status: 'error'
      }
    }
  }
}

module.exports = AccessService