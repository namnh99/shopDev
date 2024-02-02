const config = require('./config')

class Database {
  instance;

  constructor(type = 'mongodb') {
    this.connect(type)
  }

  connect(type) {
    config[type]()
  }

  static getIntance() {
    if (!this.instance) {
      this.instance = new Database()
    }

    return this.instance
  }
}

module.exports = Database.getIntance()