const BaseModel = require('./BaseModel')

class Course extends BaseModel {
  static get tableName () {
    return 'courses'
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

  static get relationMappings () {
    return {
      lessons: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'Lesson',
        join: {
          from: 'courses.id',
          to: 'lessons.courseId',
        },
      },
      author: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'User',
        join: {
          from: 'courses.authorId',
          to: 'users.id',
        },
      },
    }
  }
}

module.exports = Course
