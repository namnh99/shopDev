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
    return await KeyTokenModal.deleteOne({ _id: id })
  }

  static findByRefreshTokenUsed = async (refreshToken) => {
    return await KeyTokenModal.findOne({ refreshTokensUsed: refreshToken }).lean()
  }

  static removeByUserId = async (userId) => {
    return await KeyTokenModal.findOneAndDelete({ user: new Types.ObjectId(userId) })
  }

  static findByRefreshToken = async (refreshToken) => {
    return await KeyTokenModal.findOne({ refreshToken }).lean()
  }

  static updateRefreshTokenUsed = async (userId, oldRefreshToken, newRefreshToken) => {
    console.log('log:', oldRefreshToken)
    console.log('log:', newRefreshToken)

    const query = { user: new Types.ObjectId(userId)}
    const update = { $push: { refreshTokensUsed: oldRefreshToken }, $set: { refreshToken: newRefreshToken } }
    return await KeyTokenModal.updateOne(query, update)
  }
}

module.exports = KeyTokenService