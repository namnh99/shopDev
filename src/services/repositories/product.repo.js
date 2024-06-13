const { Types } = require('mongoose')
// Models
const { ProductModel, ElectronicModel, ClothingModel, FurnitureModel } = require('../../models/product.model')
// Response
const { NotFoundError } = require('../../core/error.response')

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

  const query = { _id: new Types.ObjectId(product_id) }
  const update = { $set: { isDraft: false, isPublished: true } }

  const { modifiedCount } = await ProductModel.updateOne(query, update)

  return modifiedCount
}

const findAllPublishedForShop = async (query, limit, skip) => {
  return await ProductModel.find(query)
    .populate('product_shop', 'name email -_id')
    .sort({ updateAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec()
}

module.exports = {
  findAllDraftsForShop,
  publishProductByShop,
  findAllPublishedForShop
}