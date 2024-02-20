require('dotenv').config()
const app = require("./src/app")
const { app: { port } } = require('./src/configs/global')
const logger = require('./src/configs/logging')(module.filename)

const config = require('./src/dbs/config.db')

app.listen(port, () => {
  logger.info(`Server listen on ${port}`)
})

const signalHandler = () => {
  logger.info('Received SIGINT. Close server')

  // notify send close Server

  // close db connection
  config[process.env.DATABASE_MANAGEMENT].close()
    .then(() => logger.info('Close database'))
    .catch(err => logger.error(`Lỗi đóng kết nối database: ${err}`))
    .finally(() => process.exit())
}

process.on('SIGINT', signalHandler)