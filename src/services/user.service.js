// Modal
const User = require('../models/user.model')

// Services
const getStatics = async () => {
  return User.getStatics()
}

const getMethods = async () => {
  const user = new User({ userId: '1', phone: 123 })
  return user.getMethods()
}

module.exports = {
  getStatics,
  getMethods
}