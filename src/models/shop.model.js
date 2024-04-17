const { Schema, model } = require('mongoose')

const DOCUMENT_NAME =  'shop'
const COLECTION_NAME = 'shop'

const ShopSchema = new Schema({
  name: {
    type: String,
    trim: true,
    maxLength: 150
  },
  email: {
    type: String,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  verify: {
    type: Schema.Types.Boolean,
    default: false,
  },
  roles: {
    type: Array,
    default: []
  }
}, {
  collection: COLECTION_NAME,
  timestamps: true
})

module.exports = model(DOCUMENT_NAME, ShopSchema)