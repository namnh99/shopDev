const { Schema, model } = require('mongoose')
const slugify = require('slugify')

const DOCUMENT_NAME = 'product'
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
  product_slug: String,
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
  },
  // more
  product_ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be above 5.0'],
    set: (val) => Math.round(val * 10) / 10
  },
  product_variations: {
    type: Array,
    default: [],
  },
  isDraft: {
    type: Boolean,
    default: true,
    index: true,
    select: false,
  },
  isPublished: {
    type: Boolean,
    default: false,
    index: true,
    select: false
  }
}, {
  collection: COLECTION_NAME,
  timestamps: true
})

// Document middleware: runs before .save() and .create()
ProductSchema.pre('save', function (next) {
  this.product_slug = slugify(this.product_name, { lower: true })
  next()
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
  timestamps: true,
  versionKey: false
})

module.exports = {
  ProductModel: model(DOCUMENT_NAME, ProductSchema),
  ClothingModel: model('clothes', ClothingSchema),
  ElectronicModel: model('electronics', ElectronicSchema),
  FurnitureModel: model('furniture', FurnitureSchema)
}