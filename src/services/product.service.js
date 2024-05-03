// Models
const { ProductsModel, ClothesModel, ElectronicsModel, FurnitureModel } = require('../models/product.model')
// Response
const { BadRequestError, ForbiddenError } = require('../core/error.response')

// define Factory class to create product - Factory pattern
class ProductFactory {
  static async createProduct() {

  }
}

// define base product class
class Product {
  constructor({ 
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_shop,
    product_attributes
   }) {
    this.product_name = product_name
    this.product_thumb = product_thumb
    this.product_description = product_description
    this.product_price = product_price
    this.product_quantity = product_quantity
    this.product_type = product_type
    this.product_shop = product_shop
    this.product_attributes = product_attributes
  }

  // create new Product
  async createProduct() {
    return await ProductsModel.create(this)
  }
}

// define sub-class for diffrence product types
class Clothes extends Product {
  async createProduct() {
    const newClothes = await ClothesModel(this.product_attributes)
    if (!newClothes) throw new BadRequestError('Create new Clothes error')
    const newProduct = super.createProduct()
    if (!newProduct) throw new BadRequestError('Create new Product error')
    return newProduct
  }
}

class Electronics extends Product {
  async createProduct() {
    const newElectronic = await ElectronicsModel(this.product_attributes)
    if (!newElectronic) throw new BadRequestError('Create new Clothes error')
    const newProduct = super.createProduct()
    if (!newProduct) throw new BadRequestError('Create new Product error')
    return newProduct
  }
}
