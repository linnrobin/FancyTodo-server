const router = require('express').Router()
const Controller = require('../controllers/api')

router.get('/holiday2020ID', Controller.holiday2020ID)
router.get('/calendarific2020ID', Controller.calendarific2020ID)

module.exports = router