// Constants
const { REASON_STATUS_CODE, STATUS_CODE } = require("../common/constant")

class SuccessResponse {
  constructor({
    message,
    statusCode = STATUS_CODE.OK,
    reasonStatusCode = REASON_STATUS_CODE.OK,
    metadata = {} }) {
    this.message = !message ? reasonStatusCode : message
    this.status = statusCode
    this.metadata = metadata
  }

  send(res, header = {}) {
    return res.status(this.status).json(this)
  }
}

class OkResponse extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata })
  }
}

class CreatedResponse extends SuccessResponse {
  constructor({
    message,
    statusCode = STATUS_CODE.CREATED,
    reasonStatusCode = REASON_STATUS_CODE.CREATED,
    metadata,
    options = {} }) {
    super({ message, statusCode, reasonStatusCode, metadata })
    this.options = options
  }
}

module.exports = {
  OkResponse,
  CreatedResponse,
  SuccessResponse
}