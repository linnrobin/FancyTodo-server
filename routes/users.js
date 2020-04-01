const router = require('express').Router()
const Controller = require('../controllers/users')

router.post('/register', Controller.signup)
router.post('/login', Controller.signin)
router.post('/googleSign', Controller.googleSign)

module.exports = router