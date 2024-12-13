// Services
const apiKeyService = require('../services/apiKey.service')
// Constants
const { HEADER } = require('../common/constant')

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString()
    if (!key) {
      return res.status(403).json({
        message: 'Forbidden Error'
      })
    }

    const objKey = await apiKeyService.findById(key)
    if (!objKey) {
      return res.status(403).json({
        message: 'Forbidden Error'
      })
    }

    req.objKey = objKey
    return next()

  } catch (error) {
    console.log(error)
    next(err)
  }
}

const permission = (permission) => {
  return async (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: 'Permission denied'
      })
    }

    if (!req.objKey.permissions.includes(permission)) {
      return res.status(403).json({
        message: 'Permission denied'
      })
    } else return next()
  }
}

module.exports = {
  apiKey,
  permission
}