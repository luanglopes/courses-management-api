const express = require('express')
const router = express.Router()

const UserController = require('../../controllers/UserController')

router.get('/', UserController.list)
router.get('/:id', UserController.getOne)
router.post('/', UserController.create)
router.put('/:id', UserController.update)
router.delete('/:id', UserController.delete)

module.exports = router
