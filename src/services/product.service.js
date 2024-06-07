// Models
const { ProductModel, ClothingModel, ElectronicModel, FurnitureModel } = require('../models/product.model')
// Response
const { BadRequestError, ForbiddenError } = require('../core/error.response')

// define Factory class to create product - Factory pattern
class ProductFactory {
  /*
    type: 'Clothes',...
    payload
  */
  static async createProduct(type, payload) {
    debugger
    switch (type) {
      case 'Clothing':
        debugger
        return new Clothing(payload).createProduct()
      case 'Electronic':
        return new Electronic(payload).createProduct()
      case 'Furniture':
        return new Furniture(payload).createProduct()
    }
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
    debugger
  }

  // create new Product
  async createProduct(product_id) {
    debugger
    return await ProductModel.create({ ...this, _id: product_id })
  }
}

// define sub-class for diffrence product types
class Clothing extends Product {
  async createProduct() {
    debugger
    const newClothes = await ClothingModel.create({
      ...this.product_attributes,
      product_shop: this.product_shop
    })
    if (!newClothes) throw new BadRequestError('Create new Clothes error')
    debugger
    const newProduct = super.createProduct(newClothes._id)
    if (!newProduct) throw new BadRequestError('Create new Product error')

    return newProduct
  }
}

class Electronic extends Product {
  async createProduct() {
    const newElectronic = await ElectronicModel.create({
      ...this.product_attributes,
      product_shop: this.product_shop
    })
    if (!newElectronic) throw new BadRequestError('Create new Clothes error')

    const newProduct = super.createProduct(newElectronic._id)
    if (!newProduct) throw new BadRequestError('Create new Product error')

    return newProduct
  }
}

class Furniture extends Product {
  async createProduct() {
    const newFurniture = await FurnitureModel.create({
      ...this.product_attributes,
      product_shop: this.product_shop
    })
    if (!newFurniture) throw new BadRequestError('Create new Furniture error')

    const newProduct = super.createProduct(newFurniture._id)
    if (!newProduct) throw new BadRequestError('Create new Product error')

    return newProduct
  }
}

module.exports = ProductFactory