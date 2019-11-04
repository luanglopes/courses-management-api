const createError = require('http-errors')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const TokenService = require('../services/TokenService')

class AuthController {
  static createInvalidCredentialsError () {
    return createError(400, 'Email or Password Incorrect')
  }

  static async authenticate (req, res, next) {
    const { email, password } = req.body

    try {
      const user = await User.query()
        .where('email', email)
        .first()

      if (!user) {
        throw AuthController.createInvalidCredentialsError()
      }

      const isPasswordRight = await bcrypt.compare(password, user.password)

      if (!isPasswordRight) {
        throw AuthController.createInvalidCredentialsError()
      }

      const token = await TokenService.createToken({
        email: user.email,
        name: user.name,
      })

      res.json({ token })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AuthController
