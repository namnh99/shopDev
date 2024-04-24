const { Schema, model } = require('mongoose')

const DOCUMENT_NAME =  'keys'
const COLECTION_NAME = 'keys'

const KeyTokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'Shop'
  },
  publicKey: {
    type: String,
    require: true,
  },
  privateKey: {
    type: String,
    require: true,
  },
  refreshTokensUsed: {
    type: Array,
    default: []
  },
  refreshToken: {
    type: String,
    require: true
  }
}, {
  collection: COLECTION_NAME,
  timestamps: true
})

module.exports = model(DOCUMENT_NAME, KeyTokenSchema)