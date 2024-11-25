const express = require('express')
const {handlelogin,handlesignup} = require('../controllers/user')
const router = express.Router()

router.get('/signup',(req,res)=>{
    res.render('signup',{error:null})
})
router.get('/login',(req,res)=>{
    res.render('login',{error:null})
})

router.post('/signup',handlesignup)
router.post('/login',handlelogin)

module.exports = router