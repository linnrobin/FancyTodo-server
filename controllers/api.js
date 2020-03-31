const axios = require('axios')

class Controller {
    static holiday2020ID(req, res) {
        axios.get(`https://date.nager.at/api/v2/publicholidays/2020/ID`)
            .then(result => {
                let { data } = result
                res.status(200).json({ data })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static calendarific2020ID(req, res) {
        axios.get(`https://calendarific.com/api/v2/holidays?&api_key=${process.env.CALENDARIFICAPIKEY}&country=ID&year=2020`)
            .then(result => {
                let { data } = result
                res.status(200).json({ data })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = Controller