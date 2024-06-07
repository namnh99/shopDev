const { Schema, model } = require('mongoose')

const DOCUMENT_NAME =  'product'
const COLECTION_NAME = 'product'

const ProductSchema = new Schema({
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
    enum: ['Electronic', 'Clothing', 'Furniture']
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
const ClothingSchema = new Schema({
  brand: {
    type: String,
    require: true
  },
  size: String,
  material: String,
  product_shop: {
    type: Schema.Types.ObjectId,
    ref: 'shop'
  }
}, {
  collection: 'clothing',
  timestamps: true
})

const ElectronicSchema = new Schema({
  manuFacturer: {
    type: String,
    require: true
  },
  model: String,
  color: String,
  product_shop: {
    type: Schema.Types.ObjectId,
    ref: 'shop'
  }
}, {
  collection: 'electronic',
  timestamps: true
})

const FurnitureSchema = new Schema({
  brand: {
    type: String,
    require: true
  },
  color: String,
  material: String,
  product_shop: {
    type: Schema.Types.ObjectId,
    ref: 'shop'
  }
}, {
  collection: 'furniture',
  timestamps: true
})

module.exports = {
  ProductModel: model(DOCUMENT_NAME, ProductSchema),
  ClothingModel: model('clothes', ClothingSchema),
  ElectronicModel: model('electronics', ElectronicSchema),
  FurnitureModel: model('furniture', FurnitureSchema)
}