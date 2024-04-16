const keyTokenModal = require('../models/keyToken.model')

class KeyTokenService {
  
  static createToken = async ({ userId, publicKey }) => {
    try {
      const publicKeyString = publicKey.toString()
      const tokens = await keyTokenModal.create({
        user: userId,
        publicKey: publicKeyString
      })

      return tokens ? PublicKeyCredential : null
    } catch (error) {
      return error
    }
  } 
}

module.exports = KeyTokenService