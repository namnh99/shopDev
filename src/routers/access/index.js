const express = require('express')
const route = express.Router()
// Controllers
const accessController = require('../../controllers/access.controller')

// sign-up
route.get('/shop/signup', accessController.signUp)

module.exports = route