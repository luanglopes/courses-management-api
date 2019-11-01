const express = require('express')
const router = express.Router()

const v1Routes = require('./v1')

router.get('/', (_req, res) => {
  res.json({ message: 'Welcome to Class Management API! Choose one version' })
})

router.use('/v1', v1Routes)

module.exports = router
