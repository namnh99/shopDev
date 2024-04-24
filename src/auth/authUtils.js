const jwt = require('jsonwebtoken')

const createTokenPair = async (payload, publicKey, privateKey ) => {
  try {
    const assessToken = await jwt.sign(payload, publicKey, {
      expiresIn: '1 days'
    })

    const refreshToken = await jwt.sign(payload, privateKey, {
      expiresIn: '7 days'
    })

    // verify
    jwt.verify(assessToken, publicKey, (err, decode) => {
      if (err) {
        console.log('error verify::', err)
      } else {
        console.log('decode verify::', decode)
      }
    })

    return { assessToken, refreshToken }
  } catch (error) {
    return error
  }
}

module.exports = {
  createTokenPair
}