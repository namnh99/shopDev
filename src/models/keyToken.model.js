const { Schema, model } = require('mongoose')

const DOCUMENT_NAME =  'Keys'
const COLECTION_NAME = 'Keys'

const keyTokenSchema = new Schema({
  name: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'Shop'
  },
  publicKey: {
    type: String,
    require: true,
  },
  refreshToken: {
    type: Array,
    default: []
  }
}, {
  collection: COLECTION_NAME,
  timestamps: true
})

module.exports = model(DOCUMENT_NAME, keyTokenSchema)
