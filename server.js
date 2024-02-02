require('dotenv').config()
const app = require("./src/app")

const server = app.listen(process.env.PORT, () => {
  console.log(`Server listen on ${process.env.PORT}`)
})


const signalHandler = () => {
  console.log('Received SIGINT. Closing server...')

  // clean up
  if (server._connections > 1) {
    server._handle = null
    server._connections = 1
  }

  server.close(_ => {
    console.log('Server closed.')
    process.exit()
  })
}

process.on('SIGINT', signalHandler)