const router = require('express').Router()
const todosRouter = require('./todos')
const usersRouter = require('./users')
const apiRouter = require('./api')

router.get('/', (req, res) => res.status(200).json({message: 'success get /'}))
router.use('/todos', todosRouter)
router.use('/users', usersRouter)
router.use('/api', apiRouter)

module.exports = router