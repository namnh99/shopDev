const { Schema, model } = require('mongoose')

const DOCUMENT_NAME =  'apiKey'
const COLECTION_NAME = 'apiKey'

const ApiKeySchema = new Schema({
  key: {
    type: String,
    require: true,
    unique: true
  },
  status: {
    type: Boolean,
    default: true
  },
  permissions: {
    type: [String],
    require: true,
    enum: ['0000', '1111', '2222']
  }
}, {
  collection: COLECTION_NAME,
  timestamps: true
})

module.exports = model(DOCUMENT_NAME, ApiKeySchema)