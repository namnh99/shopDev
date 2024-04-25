const asyncHandler = (func) => async (req, res, next) => {
  // func(req, res, next).catch(next) // use promise
  try {
    await func(req, res, next)
  } catch (error) {
    console.log('TryCatchWrapper error:::', error)
    // logger.error(`TryCatchWrapper error: ${error}`)
    next(error)
  }
}

module.exports = {
  asyncHandler
}