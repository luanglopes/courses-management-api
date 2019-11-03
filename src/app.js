const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')

const appRouter = require('./routes/index')
const database = require('./database')
const errorHanlder = require('./errorHandler')

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
app.use(errorHanlder.handle)

module.exports = app
