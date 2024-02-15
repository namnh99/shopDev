const mongoose = require('mongoose')
const logger = require('../configs/logging')(module.filename)

const endpointDb = 'mongodb://localhost:27017'

const config = {
  mongodb: () => {
    if (1 === 1) {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })
    }

    mongoose.connect(endpointDb)
      .then(() => logger.info('Connect Mongodb success'))
      .catch(err => logger.error(err))
  }
}

module.exports = config