const { apiKey, permission } = require('../middlewares/checkAuth')
const express = require('express')
const route = express.Router()

// check apiKey
route.use(apiKey)

// check permission
route.use(permission('0000'))

route.use('/v1/api', require('./access'))

module.exports = route