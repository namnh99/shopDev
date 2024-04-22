// Models
const ApiKeyModel = require('../models/apiKey.model')
// const crypto = require('crypto')

const findById = async (key) => {
  // const _key = crypto.randomBytes(64).toString('hex')
  // const newKey = apiKeyModel.create({ key: _key, permissions: ['0000'] })
  // console.log('newKey:::', newKey)
  const objKey = ApiKeyModel.findOne({ key, status: true }).lean()
  return objKey
}

module.exports = {
  findById
}