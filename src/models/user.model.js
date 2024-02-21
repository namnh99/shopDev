const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  userId: {
    type: Number,
    require: true,
  },
  name: String
})

// Statics vs methods vs virtual vs middleware
UserSchema.virtual('getTime').get(() => {
  return Date.now()
})

UserSchema.statics.getStatics = () => {
  return 'get Statics'
}

UserSchema.methods.getMethods = function(){
  console.log('log:', this.getTime)
  return 'get Methods'
}

module.exports = model('users', UserSchema)
