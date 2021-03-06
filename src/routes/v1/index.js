const express = require('express')
const router = express.Router()

const userRoutes = require('./users')
const courseRoutes = require('./courses')
const authRoutes = require('./auth')

router.get('/', (_req, res) => {
  res.json({ messgae: 'Welcome To Course Management API v1' })
})

router.use('/users', userRoutes)
router.use('/courses', courseRoutes)
router.use('/auth', authRoutes)

module.exports = router
