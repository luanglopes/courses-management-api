const createError = require('http-errors')
const debug = require('debug')('courses-management:error')

const environment = require('./config/environment')

const format = error => {
  return error.name === 'ValidationError'
    ? createError(400, { fields: error.data })
    : error
}

const handle = (error, _req, res, _next) => {
  const formattedError = format(error)

  const statusCode = formattedError.status || 500
  let errorMessage = formattedError.message || 'Internal server error'

  if (statusCode === 500 && environment.isProduction) {
    // Don't return unhandled error messages
    errorMessage = 'Internal server error'
  }

  if (environment.isDevelopment) {
    // log complete error stack
    debug(formattedError)
  } else {
    // log only error message
    debug(formattedError.message)
  }

  res.status(statusCode).json({ ...formattedError, message: errorMessage })
}

module.exports = { handle, format }
