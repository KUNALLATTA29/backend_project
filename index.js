const express = require('express')
const userRoute = require('./routes/user')
const path = require('path')
const {connectmongodb} = require('./connect')
const urlRouter = require('./routes/url')

const app = express()
app.use(express.json())
const port = 8001
connectmongodb('mongodb://localhost:27017/backend')
const {authenticatetoken} = require('./middleware/auth')
app.set('view engine','ejs')

app.set('views',path.resolve('./views'))
app.use(express.urlencoded({extended:true}))



app.use('/',userRoute)
app.use('/api',authenticatetoken ,urlRouter)



app.listen(port,()=>console.log("port is running"))