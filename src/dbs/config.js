const mongoose = require('mongoose')

const endpointDb = 'mongodb://localhost:27017'

const config = {
  mongodb: () => {
    if (1 === 1) {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })
    }

    mongoose.connect(endpointDb)
      .then(() => console.log('Connect Mongodb success'))
      .catch(err => console.log(err))
  }
}

module.exports = config