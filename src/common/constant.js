const RESPONSE = {
  ERR_ENDPOINT_NOT_FOUND: 'Đường dẫn không tồn tại',
  ERR_SERVER: 'Something went wrong',
  ERR_AUTH_HEADER_MISSING: 'auth header is missing',
  ERR_AUTH_TOKEN_MISSING: 'auth token is missing',
  ERR_JWT_DECODE: 'Incorect token',
}

const ROLE_SHOP = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITER: 'EDITER',
  ADMIN: 'ADMIN'
}

const POOL_SIZE = 50

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization'
}

module.exports = {
  RESPONSE,
  POOL_SIZE,
  ROLE_SHOP,
  HEADER
}