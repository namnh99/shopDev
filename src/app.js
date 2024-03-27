// third party
const app = require('express')();
const morgan = require('morgan')
const helmet = require('helmet');
const compression = require('compression')
const bodyParser  = require('body-parser')

// middlewares
const { endpointNotFound, errorHandle } = require('./middlewares/errorHandle')

// routers
const userRoute = require('./routers/user.route')
const shopRoute = require('./routers')

// logger
const logger = require('./configs/logging')(module.filename)

// init middleware
if (process.env.APP_ENV === 'develop') {
  const logStream = {
    write: (message) => {
      logger.info(message)
    }
  }

  app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {   // log request
    stream: logStream,
    immediate: false
  }))
}

app.use(compression())
app.use(helmet())   // protect api, info server
app.use(bodyParser.json())

// init db
require('./dbs/index')
// init routers
app.use('/health', (req, res) => {
  res.status(200).send({ message: 'OK' })
})

// app.use('/user', userRoute)
app.use('/', shopRoute)

// Error handle middleware
app.use('*', endpointNotFound)
app.use(errorHandle)

module.exports = app
