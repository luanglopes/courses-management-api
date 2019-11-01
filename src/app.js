const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')

const indexRouter = require('./routes/index')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404))
})

// error handler
app.use((err, _req, res) => {
  const code = err.status || 500
  const message = err.message || 'Internal server error'
  const error = process.env.NODE_ENV === 'development' ? err : undefined

  res.status(code).json({ code, message, error })
})

module.exports = app
