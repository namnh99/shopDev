// Constants
const { REASON_STATUS_CODE, STATUS_CODE } = require("../common/constant")

class ErrorResponse extends Error {
  constructor(message, status){
    super(message)
    this.status = status
  }
}

class ConflictError extends ErrorResponse {
  constructor(message = REASON_STATUS_CODE.CONFLICT, statusCode = STATUS_CODE.FORBIDDEN){
    super(message, statusCode)
  }
}

class BadRequestError extends ErrorResponse {
  constructor(message = REASON_STATUS_CODE.CONFLICT, statusCode = STATUS_CODE.FORBIDDEN){
    super(message, statusCode)
  }
}

class AuthFailureError extends ErrorResponse {
  constructor(message = REASON_STATUS_CODE.UNAUTHORIZED, statusCode = STATUS_CODE.UNAUTHORIZED){
    super(message, statusCode)
  }
}

class NotFoundError extends ErrorResponse {
  constructor(message = REASON_STATUS_CODE.NOT_FOUND, statusCode = STATUS_CODE.NOT_FOUND){
    super(message, statusCode)
  }
}

module.exports = {
  ConflictError,
  BadRequestError,
  AuthFailureError,
  NotFoundError
}