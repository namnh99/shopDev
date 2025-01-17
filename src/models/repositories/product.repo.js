const { Types } = require('mongoose')
// Models
const { ProductModel, ElectronicModel, ClothingModel, FurnitureModel } = require('../product.model')
// Response
const { NotFoundError } = require('../../core/error.response')
// Utils
const { typeObjectId } = require('../../utils/db')
const { getSelectData, getUnSelectData } = require('../../utils')

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
  const { modifiedCount } = await ProductModel.updateOne(query, { $set: update })
  return modifiedCount
}

const publishProductByShop = async ({ product_shop, product_id }) => {
  const update = { isDraft: false, isPublished: true }
  return await handlePublishProduct(product_shop, product_id, update)
}

const unPublishProductByShop = async ({ product_shop, product_id }) => {
  const update = { isDraft: true, isPublished: false }
  return await handlePublishProduct(product_shop, product_id, update)
}

const searchProduct = async ({ keySearch }) => {
  const regexSearch = new RegExp(keySearch)
  const results = await ProductModel.find(
    {
      $text: { $search: regexSearch },
      isPublished: true
    },
    { score: { $meta: 'textScore' } }
  )
    .sort({ score: { $meta: 'textScore' } })
    .lean()

  return results
}

const findAllProducts = async ({ limit, page, sort, filter, select }) => {
  const skip = (page - 1) * limit
  const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
  const products = await ProductModel.find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(getSelectData(select))
    .lean()

  return products
}

const findProduct = async ({ product_id, unSelect }) => {
  return await ProductModel.findById(product_id).select(getUnSelectData(unSelect)).lean()
}

const updateProductById = async ({ product_id, payload, model, isNew = true }) => {
  return await model.findByIdAndUpdate(typeObjectId(product_id), payload, {
    new: isNew
  })
}

const queryProduct = async ({ query, limit, page }) => {
  return await ProductModel.find(query)
    .populate('product_shop', 'name email -_id')
    .sort({ updateAt: -1 })
    .skip((page - 1) & limit)
    .limit(limit)
    .lean()
    .exec()
}

module.exports = {
  findAllDraftsForShop,
  publishProductByShop,
  findAllPublishedForShop,
  unPublishProductByShop,
  searchProduct,
  findAllProducts,
  findProduct,
  updateProductById
}
