const express = require('express')
const {connectmongodb} = require('./connect')
const urlRouter = require('./routes/url')

const app = express()
app.use(express.json())


const port = 8001
connectmongodb('mongodb://localhost:27017/backend')


app.use('/api',urlRouter)



app.listen(port,()=>console.log("port is running"))