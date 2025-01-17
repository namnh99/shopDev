const express = require('express')
const route = express.Router()
// Controllers
const productController = require('../../controllers/product.controller')
// ErrorHandle
const { asyncHandler } = require('../../helper/asyncHandler')
const { authentication } = require('../../auth/authUtils')

route.get('/search/:keySearch', asyncHandler(productController.searchProduct))
route.get('', asyncHandler(productController.findAllProducts))
route.get('/:product_id', asyncHandler(productController.findProduct))

// authentication
route.use(authentication)

route.post('', asyncHandler(productController.createProduct))
route.get('/draft/all', asyncHandler(productController.getAllDraftsForShop))
route.get('/published/all', asyncHandler(productController.getAllPublishedForShop))
route.post('/publish/:product_id', asyncHandler(productController.publishProductByShop))
route.post('/unpublish/:product_id', asyncHandler(productController.unPublishProductByShop))
route.patch('/:product_id', asyncHandler(productController.updateProduct))

module.exports = route
