const createError = require('http-errors')

const Course = require('../models/Course')

class CourseController {
  static async list (req, res, next) {
    const { pageNumber = 1, pageSize = 10 } = req.query

    const parsedPageSize = parseInt(pageSize, 10)
    const parsedPageNumber = parseInt(pageNumber, 10)

    try {
      const { results: courses, total } = await Course.query().page(
        parsedPageNumber - 1,
        parsedPageSize,
      )

      const totalPages = Math.ceil(total / parsedPageSize)

      res.json({
        totalPages,
        totalCount: total,
        pageSize: parsedPageSize,
        pageNumber: parsedPageNumber,
        data: courses,
      })
    } catch (error) {
      next(error)
    }
  }

  static async getOne (req, res, next) {
    const { id } = req.params

    try {
      const course = await Course.query()
        .where('id', id)
        .first()

      if (!course) {
        throw createError(404)
      }

      res.json({ user: course })
    } catch (error) {
      next(error)
    }
  }

  static async create (req, res, next) {
    const { body: courseData } = req

    try {
      const course = await Course.query().insert(courseData)

      res.status(201).json({ course })
    } catch (error) {
      next(error)
    }
  }

  static async update (req, res, next) {
    const { id } = req.params
    const { body: courseData } = req

    try {
      const course = await Course.query()
        .where('id', id)
        .first()

      if (!course) {
        throw createError(404)
      }

      await course.$query().update(courseData)

      res.json({ user: course })
    } catch (error) {
      next(error)
    }
  }

  static async delete (req, res, next) {
    const { id } = req.params

    try {
      await Course.query()
        .del()
        .where('id', id)

      res.status(204).json()
    } catch (error) {
      next(error)
    }
  }

  static async listLessons (req, res, next) {
    const { id } = req.params

    try {
      const course = await Course.query()
        .eager('lessons')
        .where('id', id)
        .first()

      if (!course) {
        throw createError(404)
      }

      const lessons = course.lessons

      res.json({ lessons })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CourseController
