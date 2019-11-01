const { Model } = require('objection')

class Lesson extends Model {
  static get tableName () {
    return 'lessons'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['name', 'description'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', minLength: 1, maxLength: 1000 },
      },
    }
  }
}

module.exports = Lesson
