const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./config/db')
const cloudinary =  require('./config/cloudonary')
const route = require('./routes/route')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/',route)



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})
3
