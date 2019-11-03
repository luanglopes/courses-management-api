const { ValidationError } = require('objection')
const bcrypt = require('bcrypt')
const unique = require('objection-unique')({
  fields: ['email'],
})

const BaseModel = require('./BaseModel')

class User extends unique(BaseModel) {
  static get tableName () {
    return 'users'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['name', 'email'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 },
      },
    }
  }

  static get relationMappings () {
    return {
      courses: {
        relation: BaseModel.HasManyRelation,
        modelClass: require('./Course'),
        join: {
          from: 'users.id',
          to: 'courses.author_id',
        },
      },
    }
  }

  static get hidden () {
    return ['password']
  }

  async $beforeInsert (queryContext) {
    await super.$beforeInsert(queryContext)

    if (!this.password) {
      throw new ValidationError({
        data: {
          password: [
            {
              message: 'is a required property',
              keyword: 'required',
              params: {
                missingProperty: 'password',
              },
            },
          ],
        },
      })
    }

    this.password = await bcrypt.hash(this.password, 10)
  }

  async $beforeUpdate (opt, queryContext) {
    await super.$beforeUpdate(opt, queryContext)

    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10)
    }
  }
}

module.exports = User
