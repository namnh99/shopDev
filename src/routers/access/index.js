const express = require('express')
const route = express.Router()
// Controllers
const accessController = require('../../controllers/access.controller')
const { tryCatchWrapper } = require('../../middlewares/errorHandle')

// sign-up
route.get('/shop/signup', tryCatchWrapper(accessController.signUp))
route.post('/shop/login', tryCatchWrapper(accessController.login))

module.exports = route