const { Types } = require('mongoose')

const ObjectId = (id) => {
  return new Types.ObjectId(id)
}

module.exports = {
  ObjectId
}