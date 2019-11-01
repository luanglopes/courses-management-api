const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const debug = require('debug')('courses-management:error')

const indexRouter = require('./routes/index')
const database = require('./database')
const environment = require('./config/environment')

const app = express()

database.init()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404))
})

// error handler
app.use((err, _req, res, _next) => {
  const code = err.status || 500
  let message = err.message || 'Internal server error'

  if (code === 500) {
    if (environment.isProduction) {
      message = 'Internal server error'
    }

    if (environment.isDevelopment) {
      debug(err)
    }
  }

  res.status(code).json({ ...err, message })
})

module.exports = app
