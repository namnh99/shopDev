const UserService = require('../services/user.service')

const getMethods = async (req, res, next) => {
  try {
    res.send({
      message: await UserService.getMethods()
    })
  } catch (error) {
    console.log(error)
  }
}

const getStatics = async (req, res, next) => {
  try {
    res.send({
      message: await UserService.getStatics()
    })
  } catch (error) {
    console.log(error)
  }
}

const createUser = async (req, res, next) => {

}

module.exports = {
  getMethods,
  getStatics
}