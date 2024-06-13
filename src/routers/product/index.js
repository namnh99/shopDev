const express = require('express')
const route = express.Router()
// Controllers
const productController = require('../../controllers/product.controller')
// ErrorHandle
const { asyncHandler } = require('../../helper/asyncHandler')
const { authentication } = require('../../auth/authUtils')

// authentication
route.use(authentication)

route.post('', asyncHandler(productController.createProduct))
route.get('/draft/all', asyncHandler(productController.getAllDraftsForShop))
route.patch('/publish/:product_id', asyncHandler(productController.publishProductByShop))

module.exports = route