const express = require('express')
const router = express.Router()

router.get('/', (_req, res) => {
  res.json({ users: [] })
})

module.exports = router
