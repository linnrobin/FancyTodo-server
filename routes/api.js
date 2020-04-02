const router = require('express').Router()
const Controller = require('../controllers/api')

router.get('/holiday2020ID', Controller.holiday2020ID)
router.get('/calendarificID/:year', Controller.calendarificID)

module.exports = router