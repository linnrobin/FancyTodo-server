const axios = require('axios')

class Controller {
    static holiday2020ID(req, res, next) {
        axios.get(`https://date.nager.at/api/v2/publicholidays/2020/ID`)
            .then(result => {
                let { data } = result
                res.status(200).json({ data })
            })
            .catch(err => {
                return next(err)
            })
    }

    static calendarificID(req, res, next) {
        let { year } = req.params
        axios.get(`https://calendarific.com/api/v2/holidays?&api_key=${process.env.CALENDARIFICAPIKEY}&country=ID&year=${year}`)
            .then(result => {
                let { data } = result
                res.status(200).json({ data })
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = Controller