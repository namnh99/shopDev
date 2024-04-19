const getFileds = ({ fileds, object }) => {
  let result = {}
  fileds.map(element => {
    result[element] = object[element]
  })
  return result
}

module.exports = {
  getFileds
}
