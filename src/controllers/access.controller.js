// Logger
const logger = require('../configs/logging')(module.filename)
// Services
const AccessService = require('../services/access.service')
// Response
const { Ok, Created, SuccessResponse } = require('../core/sucess.response')

class AccessController {
  signUp = async (req, res, next) => {
    console.log(`[P]::signup::`, req.body)
    /*
      200: OK
      201: Created
    */
    const result = await AccessService.signUp(req.body)
    return new Created({
      message: 'Registerted OK',
      metadata: result
    }).send(res)
  }

  login = async (req, res, next) => {
    const result = await AccessService.login(req.body)
    new SuccessResponse({
      metadata: result
    }).send(res)
  }

  logout = async (req, res, next) => {
    const result = await AccessService.logout(req)
    new SuccessResponse({
      message: 'Logout success!',
      metadata: result
    }).send(res)
  }
}

module.exports = new AccessController()