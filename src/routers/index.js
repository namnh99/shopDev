const express = require('express')
const route = express.Router()
// Middlewares
const { apiKey, permission } = require('../auth/checkAuth')

route.use('/health', (req, res) => {
  res.status(200).send({ message: 'OK' })
})

// check apiKey
route.use(apiKey)

// check permission
route.use(permission('0000'))

route.use('/v1/api/product', require('./product'))
route.use('/v1/api', require('./access'))

module.exports = route
