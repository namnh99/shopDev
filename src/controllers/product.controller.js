// Logger
const logger = require('../configs/logging')(module.filename)
// Services
const ProductService = require('../services/product.serviceUpdate')
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
}

module.exports = new ProductController()