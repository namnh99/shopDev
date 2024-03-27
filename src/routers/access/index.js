const express = require('express')
const route = express.Router()
const accessController = require('../../controllers/access.controller')

// signUP
route.get('/shop/signup', accessController.signUp)

module.exports = route