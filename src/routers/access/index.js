const express = require('express')
const route = express.Router()
// Controllers
const accessController = require('../../controllers/access.controller')
// ErrorHandle
const { asyncHandler } = require('../../helper/asyncHandler')
const { authentication } = require('../../auth/authUtils')

// sign-up
route.get('/shop/signup', asyncHandler(accessController.signUp))
route.post('/shop/login', asyncHandler(accessController.login))

// authentication
route.use(authentication)
// route.post('shop/')
route.post('/shop/logout', asyncHandler(accessController.logout))

module.exports = route