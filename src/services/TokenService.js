const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth')

class TokenService {
  static createToken (payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        authConfig.secret,
        { expiresIn: '1d' },
        (err, token) => {
          if (err) {
            reject(err)
          } else {
            resolve(token)
          }
        },
      )
    })
  }

  static verifToken (token) {
    return new Promise(resolve => {
      jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (!err && decoded) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  }
}

module.exports = TokenService
