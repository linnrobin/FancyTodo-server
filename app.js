require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT 
const routes = require('./routes')
const cors = require('cors')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/', routes)

app.use( (err, req, res, next) => {
    console.log('bumtralala')
    switch (err.name) {
        case "SequelizeValidationError":
            const errors = err.errors.map(el => ({
                            code: 400,
                            name: 'Bad Request',
                            message: el.message
                        }))
            return res.status(400).json({
                errors
            })

        case "BadRequest":
            return res.status(400).json({
                code: 400,
                name: 'Bad Request',
                errors: err.errors
            })

        case "NotFound":
            return res.status(404).json({
                    code: 404,
                    name: 'Not Found',
                    errors: err.errors
            })

        case "Unauthorized":
            return res.status(401).json({
                    code: 401,
                    name: 'Unauthorized',
                    errors: err.errors
            })

        default:
            return res.status(500).json({
                code: 500,
                name: 'Internal Server Error',
                errors: err.errors
            })
    }
})

app.listen(PORT, () => console.log('I love u: ', PORT))