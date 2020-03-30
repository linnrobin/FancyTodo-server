const router = require('express').Router()
const todosRouter = require('./todos')
const usersRouter = require('./users')

router.get('/', (req, res) => res.status(200).json({message: 'success get /'}))
router.use('/todos', todosRouter)
router.use('/users', usersRouter)

module.exports = router