const express = require('express')
const router = express.Router()

const userRoutes = require('./users')

router.get('/', (_req, res) => {
  res.json({ messgae: 'Welcome To Class Management API v1' })
})

router.use('/users', userRoutes)

module.exports = router
