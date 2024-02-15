require('dotenv').config()
const app = require("./src/app")
const logger = require('./src/configs/logging')(module.filename)

const server = app.listen(process.env.PORT, () => {
  logger.info(`Server listen on ${process.env.PORT}`)
})


const signalHandler = () => {
  logger.info('Received SIGINT. Close server.')

  process.exit()

  // // clean up
  // if (server._connections > 1) {
  //   server._handle = null
  //   server._connections = 1
  // }

  // server.close(_ => {
  //   console.log('Server closed.')
  //   process.exit()
  // })
}

process.on('SIGINT', signalHandler)