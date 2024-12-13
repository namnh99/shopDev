const express = require('express')
const route = express.Router()
// Controllers
const productController = require('../../controllers/product.controller')
// ErrorHandle
const { asyncHandler } = require('../../helper/asyncHandler')
const { authentication } = require('../../auth/authUtils')

route.get('/search/:keySearch', asyncHandler(productController.searchProductPublished))

// authentication
route.use(authentication)

route.post('', asyncHandler(productController.createProduct))
route.get('/draft/all', asyncHandler(productController.getAllDraftsForShop))
route.get('/published/all', asyncHandler(productController.getAllPublishedForShop))
route.patch('/publish/:product_id', asyncHandler(productController.publishProductByShop))
route.patch('/unpublish/:product_id', asyncHandler(productController.unPublishProductByShop))

module.exports = route
