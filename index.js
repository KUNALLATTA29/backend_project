const express = require('express')
const urlRoute = require('./routes/url')
const {connectmongodb} = require('./connect')

const app = express()

const port = 8001
connectmongodb('mongodb://localhost:27017/short-url')
app.use(express.json())
app.use('/',urlRoute)


app.listen(port,()=>console.log("port is running"))