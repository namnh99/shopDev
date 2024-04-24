// Models
const KeyTokenModal = require('../models/keyToken.model')
// Logger
const logger = require('../configs/logging')

class KeyTokenService {

  static createToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
    try {
      // // lv0
      // const tokens = await KeyTokenModal.create({
      //   user: userId,
      //   publicKey,
      //   privateKey
      // })

      // lv xxx
      const filter = { user: userId },
        update = {
          publicKey, privateKey, refreshTokensUsed: [], refreshToken
        },
        options = { upsert: true, new: true }
      
      const tokens = await KeyTokenModal.findOneAndUpdate(filter, update, options)

      return tokens ? tokens.publicKey : null
    } catch (error) {
      // logger.error('Error create tokens records', error)
      return error
    }
  }
}

module.exports = KeyTokenService