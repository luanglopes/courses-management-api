require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')

const appRouter = require('./routes/index')
const database = require('./database')
const errorHanlder = require('./errorHandler')

class App {
  constructor () {
    this.express = express()

    this.database()
    this.middlewares()
    this.routes()
  }

  database () {
    database.init()
  }

  middlewares () {
    this.express.use(logger('dev'))
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: false }))
  }

  routes () {
    this.express.use(appRouter)

    // handle 404
    this.express.use((_req, _res, next) => {
      next(createError(404))
    })

    // default error handler
    this.express.use(errorHanlder.handle)
  }
}

module.exports = new App().express
