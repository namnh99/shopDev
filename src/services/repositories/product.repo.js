const { Types } = require('mongoose')
// Models
const {
  ProductModel,
  ElectronicModel,
  ClothingModel,
  FurnitureModel
} = require('../../models/product.model')
// Response
const { NotFoundError } = require('../../core/error.response')
// Utils
const { typeObjectId } = require('../../utils/db')

const findAllDraftsForShop = async ({ query, limit, skip }) => {
  return await ProductModel.find(query)
    .populate('product_shop', 'name email -_id')
    .sort({ updateAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec()
}

const findAllPublishedForShop = async ({ query, limit, skip }) => {
  return await ProductModel.find(query)
    .populate('product_shop', 'name email -_id')
    .sort({ updateAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec()
}

const handlePublishProduct = async (product_shop, product_id, update) => {
  const isExisted = await ProductModel.findOne({
    product_shop: typeObjectId(product_shop),
    _id: typeObjectId(product_id)
  })

  if (!isExisted) return null

  const query = { _id: typeObjectId(product_id) }
  const { modifiedCount } = await ProductModel.updateOne(query, { set$: update })
  return modifiedCount
}

const publishProductByShop = async ({ product_shop, product_id }) => {
  const update = { isDraft: false, isPublished: true }
  return await handlePublishProduct(product_shop, product_id, update)
}

const unPublishProductByShop = async ({ product_shop, product_id }) => {
  const update = { isDraft: true, isPublishzd: false }
  return await handlePublishProduct(product_shop, product_id, update)
}

module.exports = {
  findAllDraftsForShop,
  publishProductByShop,
  findAllPublishedForShop,
  unPublishProductByShop
}
