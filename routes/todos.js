const router = require('express').Router()
const Controller = require('../controllers/todos')

router.get('/', Controller.findAll)
router.post('/', Controller.create)
router.get('/:id', Controller.findOne)
router.put('/:id', Controller.put)
router.delete('/:id', Controller.delete)

module.exports = router