const { Types } = require('mongoose')
// Models
const KeyTokenModel = require('../models/keyToken.model')
// Logger
// const logger = require('../configs/logging')
// Utils
const { typeObjectId } = require('../utils/db')

class KeyTokenService {
  static createToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
    try {
      const filter = { user: userId },
        update = {
          publicKey,
          privateKey,
          refreshTokensUsed: [],
          refreshToken
        },
        options = { upsert: true, new: true }

      const tokens = await KeyTokenModel.findOneAndUpdate(filter, update, options)

      return tokens ? tokens : null
    } catch (error) {
      // logger.error('Error create tokens records', error)
      return error
    }
  }

  static findByUserId = async (userId) => {
    return await KeyTokenModel.findOne({ user: typeObjectId(userId) }).lean()
  }

  static removeById = async (id) => {
    return await KeyTokenModel.deleteOne({ _id: id })
  }

  static findByRefreshTokenUsed = async (refreshToken) => {
    return await KeyTokenModel.findOne({ refreshTokensUsed: refreshToken }).lean()
  }

  static removeByUserId = async (userId) => {
    return await KeyTokenModel.findOneAndDelete({ user: typeObjectId(userId) })
  }

  static findByRefreshToken = async (refreshToken) => {
    return await KeyTokenModel.findOne({ refreshToken }).lean()
  }

  static updateRefreshTokenUsed = async (userId, oldRefreshToken, newRefreshToken) => {
    const query = { user: typeObjectId(userId) }
    const update = {
      $push: { refreshTokensUsed: oldRefreshToken },
      $set: { refreshToken: newRefreshToken }
    }
    return await KeyTokenModel.updateOne(query, update)
  }
}

module.exports = KeyTokenService
