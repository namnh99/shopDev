// Logger
const logger = require('../configs/logging')(module.filename)
// Constants
const { RESPONSE, STATUS_CODE } = require('../common/constant')

const endpointNotFound = (req, res, next) => {
  const error = {
    status: STATUS_CODE.NOT_FOUND,
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

module.exports = {
  endpointNotFound,
  errorHandle,
}