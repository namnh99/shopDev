const { Types } = require('mongoose')

const typeObjectId = (id) => {
  return new Types.ObjectId(id)
}

module.exports = {
  typeObjectId
}