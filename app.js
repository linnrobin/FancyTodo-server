require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT 
const routes = require('./routes')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/', routes)

app.use( (err, req, res, next) => {
    console.log('bumtralala')
    switch (err.name) {
        case "SequelizeValidationError":
            console.log('masuk sequelizeValidationError')
            const errors = err.errors.map(el => ({
                            code: 400,
                            name: 'Bad Request',
                            message: el.message
                        }))
            return res.status(400).json({
                errors
            })

        case "BadRequest":
            console.log('masuk bad requests')
            return res.status(400).json({
                errors: err.errors
            })

        default:
            console.log('masuk default')
            console.log(err.name)
            return res.status(500).json({
                errors: err.errors    
            })
    }
})
//     if( err.name == "SequelizeValidationError") {
//         const errors = err.errors.map(el => ({
//             code: 400,
//             name: 'BadRequest',
//             message: el.message
//         }))
//         return res.status(400).json({
//             errors
//         })
//     } else {
//         res.status(500).json({
//             errors: err
//         })
//     }
// })

app.listen(PORT, () => console.log('I love u: ', PORT))