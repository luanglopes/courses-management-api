const Knex = require('knex')
const { Model, knexSnakeCaseMappers } = require('objection')
const debug = require('debug')('courses-management:server')

const knexConfig = require('../knexfile')
const environment = require('./config/environment')

const init = () => {
  try {
    const config = environment.isProduction
      ? knexConfig.production
      : knexConfig.development

    const knex = Knex({
      ...config,
      ...knexSnakeCaseMappers(),
    })

    Model.knex(knex)
  } catch (error) {
    debug('Error connecting to Database', error)

    process.exit(1)
  }
}

module.exports = { init }
