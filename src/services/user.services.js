// Modal
const User = require('../models/user.model')

// Services
const getStatics = async () => {
  return User.getStatics()
}

const getMethods = async () => {
  return User.getMethods()
}

module.exports = {
  getStatics,
  getMethods
}