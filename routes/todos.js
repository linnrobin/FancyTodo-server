const router = require('express').Router()
const Controller = require('../controllers/todos')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


router.use(authentication)
router.get('/', Controller.findAll)
router.post('/', Controller.create)
router.get('/:id', authorization, Controller.findOne)
router.put('/:id', authorization, Controller.put)
router.delete('/:id', authorization, Controller.delete)

module.exports = router