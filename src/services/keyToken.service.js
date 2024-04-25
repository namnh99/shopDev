const { Types } = require('mongoose')
// Models
const KeyTokenModal = require('../models/keyToken.model')
// Logger
// const logger = require('../configs/logging')

class KeyTokenService {

  static createToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
    try {
      const filter = { user: userId },
        update = {
          publicKey, privateKey, refreshTokensUsed: [], refreshToken
        },
        options = { upsert: true, new: true }

      const tokens = await KeyTokenModal.findOneAndUpdate(filter, update, options)

      return tokens ? tokens : null
    } catch (error) {
      // logger.error('Error create tokens records', error)
      return error
    }
  }

  static findByUserId = async (userId) => {
    return await KeyTokenModal.findOne({ user: new Types.ObjectId(userId) }).lean()
  }

  static removeById = async (id) => {
    return await KeyTokenModal.deleteOne({ id })
  }
}

module.exports = KeyTokenService