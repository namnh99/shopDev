const logger = require('../configs/logging')(module.filename)
const shopService = require('../services/access/access.service')

class AccessController {
  signUp = async (req, res, next) => {
    try {
      logger.info(`[P]::signup::`, req.body)
      /*
        200: OK
        201: Created
      */
      return res.status(200).json({
        code: '20001',
        metadata: { userId: 1 }
      })
    } catch (error) {
      logger.error(error)
    }
  }
}

module.exports = new AccessController()