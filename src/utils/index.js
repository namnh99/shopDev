const getFileds = ({ fileds, object }) => {
  let result = {}
  fileds.map((element) => {
    result[element] = object[element]
  })
  return result
}

const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 1]))
}

const getUnSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 0]))
}

const removeNullUndefinedObject = (object) => {
  Object.keys(object).forEach((key) => {
    if (object[key] === null || object[key] === undefined) {
      delete object[key]
    } else if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
      removeNullUndefinedObject(object[key])
    }
  })
  return object
}

const updateNestedObjectParser = (object) => {
  const final = {}
  Object.keys(object).forEach((key) => {
    if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
      const result = updateNestedObjectParser(object[key])
      // final[key] = result
      Object.keys(result).forEach((keyChild) => {
        final[`${key}.${keyChild}`] = result[keyChild]
      })
    } else {
      final[key] = object[key]
    }
  })
  return final
}

module.exports = {
  getFileds,
  getSelectData,
  getUnSelectData,
  removeNullUndefinedObject,
  updateNestedObjectParser
}
