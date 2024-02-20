const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  userId: {
    type: Number,
    require: true,
  },
  name: String
})

// Statics vs methods vs virtual vs middleware

UserSchema.statics.getStatics = () => {
  return 'get Statics'
}

UserSchema.methods.getMethods = () => {
  return 'get Methods'
}

module.exports = model('User', UserSchema)
