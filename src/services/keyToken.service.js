const keyTokenModal = require('../models/keyToken.model')
const logger = require('../configs/logging')

class KeyTokenService {
  
  static createToken = async ({ userId, publicKey, privateKey }) => {
    try {
      const tokens = await keyTokenModal.create({
        user: userId,
        publicKey,
        privateKey
      })

      return tokens ? tokens.publicKey : null
    } catch (error) {
      // logger.error('Error create tokens records', error)
      return error
    }
  } 
}

module.exports = KeyTokenService