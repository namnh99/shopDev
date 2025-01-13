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

module.exports = {
  getFileds,
  getSelectData,
  getUnSelectData
}
