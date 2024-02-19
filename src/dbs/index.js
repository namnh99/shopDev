const config = require('./config.db')

class Database {
  instance;

  constructor(type) {
    this.connect(type)
  }

  connect(type) {
    config[type].connect()
  }

  static getIntance(type) {
    if (!this.instance) {
      this.instance = new Database(type)
    }

    return this.instance
  }
}

const instanceMongoDb = Database.getIntance(process.env.DATABASE_MANAGEMENT)

module.exports = instanceMongoDb