const createError = require('http-errors')

const User = require('../models/User')

class UserController {
  static async list (req, res, next) {
    const { pageNumber = 1, pageSize = 10 } = req.query

    const parsedPageSize = parseInt(pageSize, 10)
    const parsedPageNumber = parseInt(pageNumber, 10)

    try {
      const { results: users, total } = await User.query().page(
        parsedPageNumber - 1,
        parsedPageSize,
      )

      const totalPages = Math.ceil(total / parsedPageSize)

      res.json({
        totalPages,
        totalCount: total,
        pageSize: parsedPageSize,
        pageNumber: parsedPageNumber,
        data: users,
      })
    } catch (error) {
      next(error)
    }
  }

  static async getOne (req, res, next) {
    const { id } = req.params

    try {
      const user = await User.query()
        .where('id', id)
        .first()

      if (!user) {
        throw createError(404)
      }

      res.json({ user })
    } catch (error) {
      next(error)
    }
  }

  static async create (req, res, next) {
    const { body: userData } = req

    try {
      const user = await User.query().insert(userData)

      res.status(201).json({ user })
    } catch (error) {
      next(error)
    }
  }

  static async update (req, res, next) {
    const { id } = req.params
    const { body: userData } = req

    try {
      const user = await User.query()
        .where('id', id)
        .first()

      if (!user) {
        throw createError(404)
      }

      await user.$query().update(userData)

      res.json({ user })
    } catch (error) {
      next(error)
    }
  }

  static async delete (req, res, next) {
    const { id } = req.params

    try {
      await User.query()
        .del()
        .where('id', id)

      res.status(204).json()
    } catch (error) {
      next(error)
    }
  }

  static async listCourses (req, res, next) {
    const { id } = req.params
    const { pageNumber = 1, pageSize = 10 } = req.query

    const parsedPageSize = parseInt(pageSize, 10)
    const parsedPageNumber = parseInt(pageNumber, 10)

    try {
      const user = await User.query()
        .eager('courses')
        .modifyEager('courses', builder => {
          builder.page(parsedPageNumber, parsedPageSize)
        })
        .where('id', id)
        .first()

      if (!user) {
        createError(404)
      }

      const courses = user.courses

      res.json({ courses })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController
