const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const router = require('./routes/commentRoute')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to mongodb')
})
.catch((error) => {
    console.log(`Mongodb error: ${error}`)
})

app.use(express.json())
app.use(cors())

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Sever started on port ${PORT}`)
})