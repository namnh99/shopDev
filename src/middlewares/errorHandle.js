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
  logger.error(`Error middleware: ${JSON.stringify(err)}`)
  const status = err.status || 500
  const message = err.message || RESPONSE.ERR_SERVER
  const data = err.data || null
  res.status(status).send({
    type: 'error',
    message,
    data
  })
} 

const tryCatchWrapper = (func) => (req, res, next) => {
  try {
    func(req, res)
  } catch (error) {
    logger.error(`TryCatchWrapper error: ${err}`)
  }
}

module.exports = {
  endpointNotFound,
  errorHandle,
  tryCatchWrapper
}