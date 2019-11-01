const createError = require('http-errors')

const User = require('../models/User')

const handleError = error => {
  return error.name === 'ValidationError'
    ? createError(400, { fields: error.data })
    : error
}

class UserController {
  static async list (req, res, next) {
    const { pageNumber = 1, pageSize = 10 } = req.query

    const pageSizeParsed = parseInt(pageSize, 10)
    const pageNumberParsed = parseInt(pageNumber, 10)

    try {
      const { results: users, total } = await User.query().page(
        pageNumberParsed - 1,
        pageSizeParsed,
      )

      const totalPages = Math.ceil(total / pageSizeParsed)

      res.json({
        totalPages,
        totalCount: total,
        pageSize: pageSizeParsed,
        pageNumber: pageNumberParsed,
        data: users,
      })
    } catch (error) {
      next(error)
    }
  }

  static async getOne (req, res) {
    const { id } = req.params

    const user = await User.query()
      .where('id', id)
      .first()

    res.json({ user })
  }

  static async create (req, res, next) {
    const { body: userData } = req

    try {
      const user = await User.query().insert(userData)

      res.status(201).json({ user })
    } catch (error) {
      next(handleError(error))
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
      next(handleError(error))
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
}

module.exports = UserController
