// Models
const ApiKeyModel = require('../models/apiKey.model')
const crypto = require('crypto')

const findById = async (key) => {
  const objKey = ApiKeyModel.findOne({ key, status: true }).lean()
  return objKey
}

const createApiKey = async (permissions) => {
  const _key = crypto.randomBytes(64).toString('hex')
  const newKey = ApiKeyModel.create({ key: _key, permissions })
  console.log('newKey:::', newKey)
}

module.exports = {
  findById,
  createApiKey
}