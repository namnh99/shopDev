const jwt = require('jsonwebtoken')
// Services
const KeyTokenService = require('../services/keyToken.service')
// Auth Utils
const { asyncHandler } = require('../helper/asyncHandler')
// Responses
const { AuthFailureError, NotFoundError } = require('../core/error.response')
// Constants
const { HEADER } = require('../common/constant')

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // use HMAC(symmetric) + SHA256(hash) - HS256
    const accessToken = await jwt.sign(payload, publicKey, {
      expiresIn: '1 days'
    })

    const refreshToken = await jwt.sign(payload, privateKey, {
      expiresIn: '7 days'
    })

    // verify
    jwt.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log('error verify::', err)
      } else {
        console.log('decode verify::', decode)
      }
    })

    return { accessToken, refreshToken }
  } catch (error) {
    return error
  }
}

const authentication = asyncHandler(async (req, res, next) => {
  /*
    1. Check user header missing?
    2. get accessToken
    3. verity token
    4. check user in dbs
    5. check KeyStore with this userId
    6. OK all -> return next()
  */

  const userId = req.headers[HEADER.CLIENT_ID]
  if (!userId) throw new AuthFailureError('Invalid request')

  const keyStore = await KeyTokenService.findByUserId(userId)
  if (!keyStore) throw new NotFoundError('Not found KeyStore')

  const accessToken = req.headers[HEADER.AUTHORIZATION]
  if (!accessToken) throw new NotFoundError('Invalid request')

  try {
    const decodeUser = jwt.verify(accessToken, keyStore.publicKey)  
    if (userId !== decodeUser.userId) throw new AuthFailureError('Invalid UserId')
    req.keyStore = keyStore
    req.user = decodeUser
    return next()
  } catch (error) {
    throw error
  }
})

const verifyJwtToken = (token, keySecret) => {
  return jwt.verify(token, keySecret)
}

module.exports = {
  createTokenPair,
  authentication,
  verifyJwtToken
}