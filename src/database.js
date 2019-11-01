const Knex = require('knex')
const { Model, knexSnakeCaseMappers } = require('objection')
const debug = require('debug')('class-management:server')

const knexConfig = require('../knexfile')

const init = () => {
  try {
    const config =
      process.env.NODE_ENV === 'production'
        ? knexConfig.productioni
        : knexConfig.development

    const knex = Knex({
      ...config,
      ...knexSnakeCaseMappers,
    })

    Model.knex(knex)
  } catch (error) {
    debug('Error connecting to Database', error)

    process.exit(1)
  }
}

module.exports = { init }
