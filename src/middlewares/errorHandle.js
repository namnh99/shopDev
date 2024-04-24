// Logger
const logger = require('../configs/logging')(module.filename)
// Constants
const { RESPONSE } = require('../common/constant')

const endpointNotFound = (req, res, next) => {
  const error = {
    status: 404,
    message: RESPONSE.ERR_ENDPOINT_NOT_FOUND,
    data: req.originalUrl
  }
  next(error)
}

const errorHandle = (err, req, res, next) => {
  // logger.error(`Error middleware: ${err.message}`)
  const status = err.status || 500
  const message = err.message || RESPONSE.ERR_SERVER
  const data = err.data || null
 
  res.status(status).send({
    type: 'error',
    message,
    data
  })
} 

const tryCatchWrapper = (func) => async (req, res, next) => {
  // func(req, res, next).catch(next) // use promise
  try {
    await func(req, res, next)
  } catch (error) {
    console.log('TryCatchWrapper error:::', error)
    // logger.error(`TryCatchWrapper error: ${error}`)
    next(error)
  }
}

module.exports = {
  endpointNotFound,
  errorHandle,
  tryCatchWrapper
}