// Models
const {
  ProductModel,
  ClothingModel,
  ElectronicModel,
  FurnitureModel
} = require('../models/product.model')
// Response
const { BadRequestError, ForbiddenError } = require('../core/error.response')
// Repo to Query
const {
  findAllDraftsForShop,
  publishProductByShop,
  findAllPublishedForShop,
  unPublishProductByShop,
  searchProduct,
  findAllProducts,
  findProduct
} = require('../models/repositories/product.repo')
const { Types } = require('mongoose')

// define Factory class to create product - Factory pattern
class ProductFactory {
  static productRegistry = {}

  static registerProductType(type, classRef) {
    // Straterty pattern
    ProductFactory.productRegistry[type] = classRef
  }

  static async createProduct(type, payload) {
    const productClass = ProductFactory.productRegistry[type]
    if (!productClass) throw new BadRequestError('Product type not found')
    return new productClass(payload).createProduct()
  }

  static async findAllDraftsForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isDraft: true }
    return await findAllDraftsForShop({ query, limit, skip })
  }

  static async findAllPublishedForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isDraft: false, isPublished: true }
    return await findAllPublishedForShop({ query, limit, skip })
  }

  static async publishProductByShop({ product_shop, product_id }) {
    return await publishProductByShop({ product_shop, product_id })
  }

  static async unPublishProductByShop({ product_shop, product_id }) {
    return await unPublishProductByShop({ product_shop, product_id })
  }

  static async searchProduct({ keySearch }) {
    return await searchProduct({ keySearch })
  }

  static async findAllProducts({
    limit = 50,
    page = 1,
    sort = 'ctime',
    filter = { isPublished: true }
  }) {
    return await findAllProducts({
      limit,
      page,
      sort,
      filter,
      select: ['product_name', 'product_price', 'product_thumb']
    })
  }

  static async findProduct({ product_id }) {
    return await findProduct({ product_id, unSelect: ['__v'] })
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
  async createProduct(product_id) {
    return await ProductModel.create({ ...this, _id: product_id })
  }
}

// define sub-class for diffrence product types
class Clothing extends Product {
  async createProduct() {
    const newClothes = await ClothingModel.create({
      ...this.product_attributes,
      product_shop: this.product_shop
    })
    if (!newClothes) throw new BadRequestError('Create new Clothes error')

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

ProductFactory.registerProductType('Clothing', Clothing)
ProductFactory.registerProductType('Electronic', Electronic)
ProductFactory.registerProductType('Furniture', Furniture)

module.exports = ProductFactory
