const createError = require('http-errors')

const Lesson = require('../models/Lesson')
const Course = require('../models/Course')

class LessonController {
  static async getOne (req, res, next) {
    const { id } = req.params

    try {
      const lesson = await Lesson.query()
        .where('id', id)
        .first()

      if (!lesson) {
        throw createError(404)
      }

      res.json({ lesson })
    } catch (error) {
      next(error)
    }
  }

  static async create (req, res, next) {
    const { body: lessonData } = req
    const { courseId } = req.params

    try {
      const course = await Course.query()
        .where('id', courseId)
        .first()

      if (!course) {
        throw createError(400, {
          cause: 'Course does not exist',
          description: 'Can\'t create a lesson whitout a course',
        })
      }

      const lesson = await Lesson.query().insert({
        ...lessonData,
        courseId: parseInt(courseId, 10),
      })

      res.status(201).json({ lesson })
    } catch (error) {
      next(error)
    }
  }

  static async update (req, res, next) {
    const { id } = req.params
    const { body: lessonData } = req

    try {
      const lesson = await Lesson.query()
        .where('id', id)
        .first()

      if (!lesson) {
        throw createError(404)
      }

      await lesson.$query().update(lessonData)

      res.json({ lesson })
    } catch (error) {
      next(error)
    }
  }

  static async delete (req, res, next) {
    const { id } = req.params

    try {
      await Lesson.query()
        .del()
        .where('id', id)

      res.status(204).json()
    } catch (error) {
      next(error)
    }
  }
}

module.exports = LessonController
