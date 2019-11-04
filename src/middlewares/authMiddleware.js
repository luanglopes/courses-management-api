const createError = require('http-errors')

const TokenService = require('../services/TokenService')

module.exports = async (req, res, next) => {
  const { authorization } = req.headers

  try {
    const token = authorization && authorization.split(' ')[1]

    if (!token) {
      throw createError(401)
    }

    const isValidtoken = await TokenService.verifToken(token)

    if (!isValidtoken) {
      throw createError(401)
    }

    next()
  } catch (error) {
    next(error)
  }
}
