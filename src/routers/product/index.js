const express = require('express')
const route = express.Router()
// Controllers
const productController = require('../../controllers/product.controller')
// ErrorHandle
const { asyncHandler } = require('../../helper/asyncHandler')
const { authentication } = require('../../auth/authUtils')

// authentication
route.use(authentication)
// route.post('shop/')
route.post('', asyncHandler(productController.createProduct))

module.exports = route