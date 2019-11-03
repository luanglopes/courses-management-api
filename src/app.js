const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const debug = require('debug')('courses-management:error')

const appRouter = require('./routes/index')
const database = require('./database')
const environment = require('./config/environment')

const app = express()

database.init()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(appRouter)

// handle 404
app.use((_req, _res, next) => {
  next(createError(404))
})

// default error handler
app.use((error, _req, res, _next) => {
  const statusCode = error.status || 500
  let errorMessage = error.message || 'Internal server error'

  if (statusCode === 500 && environment.isProduction) {
    // Don't return unhandled error messages
    errorMessage = 'Internal server error'
  }

  if (environment.isDevelopment) {
    // log complete error stack
    debug(error)
  } else {
    // log only error message
    debug(error.message)
  }

  res.status(statusCode).json({ ...error, message: errorMessage })
})

module.exports = app
