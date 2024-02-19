const mongoose = require('mongoose')
const logger = require('../configs/logging')(module.filename)
const { countConnect } = require('../helper/check.connect')

const endpointDb = 'mongodb://localhost:27017'

const config = {
  mongodb: {
    connect: () => {
      if (process.env.APP_ENV === 'develop') {
        mongoose.set('debug', true)
        mongoose.set('debug', { color: true })
      }

      mongoose.connect(endpointDb)
        .then(() => {
          const count = countConnect()
          logger.info(`Connect Mongodb success, ${count} connections`)
        })
        .catch(err => logger.error(err))
    },
    close: () => mongoose.connection.close()
  }
}

module.exports = config