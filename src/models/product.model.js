const { Schema, model } = require('mongoose')

const DOCUMENT_NAME =  'products'
const COLECTION_NAME = 'products'

const ProductsSchema = new Schema({
  product_name: {
    type: String,
    require: true
  },
  product_thumb: {
    type: String,
    require: true
  },
  product_description: String,
  product_price: {
    type: Number,
    require: true
  },
  product_quantity: {
    type: Number,
    require: true
  },
  product_type: {
    type: String,
    require: true,
    enum: ['Electronics', 'Clothes', 'Furniture']
  },
  product_shop: {
    type: Schema.Types.ObjectId,
    ref: 'shop'
  },
  product_attributes: {
    type: Schema.Types.Mixed,
    require: true
  }
}, {
  collection: COLECTION_NAME,
  timestamps: true
})

// define product type schema
const ClothesSchema = new Schema({
  brand: {
    type: String,
    require: true
  },
  size: String,
  material: String
}, {
  collection: 'clothes',
  timestamps: true
})

const ElectronicsSchema = new Schema({
  manuFacturer: {
    type: String,
    require: true
  },
  model: String,
  color: String
}, {
  collection: 'electronics',
  timestamps: true
})

const FurnitureSchema = new Schema({
  brand: {
    type: String,
    require: true
  },
  color: String,
  material: String
}, {
  collection: 'furniture',
  timestamps: true
})

module.exports = {
  products: model(DOCUMENT_NAME, ProductsSchema),
  clothes: model('clothes', ClothesSchema),
  electronics: model('electronics', ElectronicsSchema),
  furniture: model('furniture', FurnitureSchema)
}