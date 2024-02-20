const develop = {
  app: {
    port: process.env.DEV_APP_PORT || 3002
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || 'shopDev',
  }
}

const product = {
  app: {
    port: process.env.PRODUCT_APP_PORT || 3000
  },
  db: {
    host: process.env.PRODUCT_DB_HOST || 'localhost',
    port: process.env.PRODUCT_DB_PORT || 27017,
    name: process.env.PRODUCT_DB_NAME || 'shopProduct',
  }
}

const config = { develop, product }

const env = process.env.APP_ENV || 'develop'

module.exports = config[env]