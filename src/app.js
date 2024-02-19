const app = require('express')();
const morgan = require('morgan')
const helmet = require('helmet');
const compression = require('compression');

const logger = require('./configs/logging')(module.filename)

const logStream = {
  write: (message) => {
    logger.info(message)
  }
}

// init middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {   // log request
  stream: logStream,
  immediate: false
}))
app.use(compression())
app.use(helmet())   // protect api, info server

// init db
require('./dbs/index')
// init routers
app.use('/health', (req, res) => {
  res.status(200).send({ message: 'OK' })
})

module.exports = app
