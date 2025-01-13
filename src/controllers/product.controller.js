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

  // Get all product draft //
  /**
   * @description: get all Draft for shop
   * @param {Numer} req.limit
   * @param {Number} req.skip
   * @return {JSON}
   */
  getAllDraftsForShop = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get list prodcut draft success',
      metadata: await ProductService.findAllDraftsForShop({
        product_shop: req.user.userId
      })
    }).send(res)
  }
  // end

  /**
   * @description: publish product
   * @param {Number} req.user.userId
   * @param {Number} res.params.product_id
   * @return {JSON}
   */
  publishProductByShop = async (req, res, next) => {
    new SuccessResponse({
      message: 'Publish product success',
      metadata: await ProductService.publishProductByShop({
        product_shop: req.user.userId,
        product_id: req.params.product_id
      })
    }).send(res)
  }

  getAllPublishedForShop = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get list product published success',
      metadata: await ProductService.findAllPublishedForShop({
        product_shop: req.user.userId
      })
    }).send(res)
  }

  unPublishProductByShop = async (req, res, next) => {
    new SuccessResponse({
      message: 'UnPublish product success',
      metadata: await ProductService.unPublishProductByShop({
        product_shop: req.user.userId,
        product_id: req.params.product_id
      })
    }).send(res)
  }

  searchProduct = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get list search products published success',
      metadata: await ProductService.searchProduct({ keySearch: req.params.keySearch })
    }).send(res)
  }

  findAllProducts = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get list findAllProducts success',
      metadata: await ProductService.findAllProducts(req.query)
    }).send(res)
  }

  findProduct = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get findProduct success',
      metadata: await ProductService.findProduct({
        product_id: req.params.product_id
      })
    }).send(res)
  }
}

module.exports = new ProductController()
