const User = require('../models/User')

class UserController {
  static async list (req, res) {
    const { pageNumber = 1, pageSize = 10 } = req.query

    const offset = (pageNumber - 1) * pageSize

    const [users, { 'count(`id`)': totalCount }] = await Promise.all([
      User.query()
        .offset(offset)
        .limit(pageSize),
      User.query()
        .count('id')
        .first(),
    ])

    const totalPages = Math.ceil(totalCount / pageSize)

    res.json({ totalPages, totalCount, pageSize, users })
  }

  static async getOne (req, res) {
    const { id } = req.params

    const user = await User.query()
      .where('id', id)
      .first()

    res.json({ user })
  }

  static async create (req, res) {
    const { body: userData } = req

    const user = await User.query().insert(userData)

    res.status(201).json({ user })
  }

  static update (req, res) {
    const { id } = req.params
    const { body: userData } = req

    const user = User.query()
      .update(userData)
      .where('id', id)

    res.json({ user })
  }

  static async delete (req, res) {
    const { id } = req.params

    await User.query()
      .del()
      .where('id', id)

    res.status(204).json()
  }
}

module.exports = UserController
