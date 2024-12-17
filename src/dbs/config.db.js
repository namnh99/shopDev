const mongoose = require('mongoose')
const logger = require('../configs/logging')(module.filename)
const { countConnect } = require('../helper/check.connect')

const { POOL_SIZE } = require('../common/constant')
const {
  db: { host, port, name }
} = require('../configs/global')

const MONGODB_ENDPOINT = `mongodb://${host}:${port}/${name}`

/*
  Straterty pattern
  Create object combine all databaes can used.
*/
const config = {
  mongodb: {
    connect: () => {
      if (process.env.APP_ENV === 'develop') {
        mongoose.set('debug', true)
      }

      mongoose
        .connect(MONGODB_ENDPOINT, { maxPoolSize: POOL_SIZE })
        .then(() => {
          const count = countConnect()
          logger.info(`Connect Mongodb success, ${count} connections`)
        })
        .catch((err) => logger.error(`Lỗi kết nối tới mongodb: ${err}`))
    },
    close: () => mongoose.connection.close()
  }
}

module.exports = config
