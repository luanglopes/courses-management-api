const express = require('express')
const router = express.Router()

const CoursesController = require('../../controllers/CourseController')
const LessonsController = require('../../controllers/LessonsController')

router.get('/', CoursesController.list)
router.get('/:id', CoursesController.getOne)
router.post('/', CoursesController.create)
router.put('/:id', CoursesController.update)
router.delete('/:id', CoursesController.delete)
router.get('/:id/lessons', CoursesController.listLessons)

router.get('/:courseId/lessons/:id', LessonsController.getOne)
router.post('/:courseId/lessons', LessonsController.create)
router.put('/:courseId/lessons/:id', LessonsController.update)
router.delete('/:courseId/lessons/:id', LessonsController.delete)

module.exports = router
