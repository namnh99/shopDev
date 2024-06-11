// Logger
const logger = require('../configs/logging')(module.filename)
// Services
const ProductService = require('../services/product.service')
// Response
const { OkResponse, CreatedResponse, SuccessResponse } = require('../core/sucess.response')

class ProductController {
  createProduct = async (req, res, next) => {
    new CreatedResponse({
      message: 'Create new Proudct success',
      metadata: await ProductService.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user.userId
      })
    }).send(res)
  }

  // Query
  /**
   * @description: get all Draft for shop
   * @param {Numer} req.limit 
   * @param {Number} req.skip 
   * @return {JSON} 
   */
  getAllDraftsForShop = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get list success',
      metadata: await ProductService.findAllDraftsForShop({
        product_shop: req.user.userId
      })
    }).send(res)
  }
  // End query
}

module.exports = new ProductController()