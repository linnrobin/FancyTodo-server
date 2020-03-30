require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT 
const routes = require('./routes')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/', routes)

app.listen(PORT, () => console.log('I love u: ', PORT))