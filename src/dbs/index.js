const config = require('./config.db')

/* 
  Without nodejs behavior cache files (dont re-call/re-execute file)-only one instance, 
  Still design with only one instance if re-call/re-execute class
  Singleton Pattern
*/
class Database {
  instance;

  constructor(type) {
    this.connect(type)
  }

  connect(type) {
    // Straterty pattern
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