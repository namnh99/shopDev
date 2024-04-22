// Logger
const logger = require('../configs/logging')(module.filename)
// Services
const ShopService = require('../services/access.service')

class AccessController {
  signUp = async (req, res, next) => {
    try {
      console.log(`[P]::signup::`, req.body)
      /*
        200: OK
        201: Created
      */
      const result = await ShopService.signUp(req.body)
      return res.status(200).json(result)
    } catch (error) {
      logger.error(error)
      next(error)
    }
  }
}

module.exports = new AccessController()