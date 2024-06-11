const { NotFoundError } = require('../../core/error.response')
const { ProductModel, ElectronicModel, ClothingModel, FurnitureModel } = require('../../models/product.model')
const { Types } = require('mongoose')

const findAllDraftsForShop = async ({ query, limit, skip }) => {
  return await ProductModel.find(query)
    .populate('product_shop', 'name email -_id')
    .sort({ updateAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec()
}

const publishProductByShop = async ({ product_shop, product_id }) => {
  const foundShop = await ProductModel.findOne({
    product_shop: new Types.ObjectId(product_shop),
    _id: new Types.ObjectId(product_id)
  })

  if (!foundShop) return null
  foundShop.isDraft = false
  foundShop.isPublished = true
}

module.exports = {
  findAllDraftsForShop
}