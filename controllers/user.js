const bcrypt = require('bcrypt')
const User = require('../models/user')
const {genratetoken} = require('../middleware/auth')

async function handlesignup(req,res){
    const {email,name,password} = req.body

    if(!email || !name || !password){
        return res.render('signup',{error:"all fields are required"})
    }
    try{
        const existinguser = await User.findOne({email})
        if(existinguser){
            return res.render('signup',{error:"user already exists!"})
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)
        const newuser = await User.create({
            name:name,
            email:email,
            password:hash
        })
        const token = genratetoken(newuser)
        res.setHeader('Authorization',`Bearer ${token}`);
        return res.redirect('/')
    }catch(err){
        return res.render('error',{message:"server is not responding"})
    }
}

async function handlelogin(req,res){
    const {email,password} = req.body

    if(!email || !password){
        return res.render('login',{error:"email and password is required"})

    }
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.render('login',{error:"invalid email or password"})
        }
        const ismatch = await bcrypt.compare(password,user.password)
        if(!ismatch){
            return res.render('login',{error:"invalid email or password"})

        }
        const token = genratetoken(user)
        res.setHeader('Authorization', `Bearer ${token}`)
        return res.redirect('/')
    }catch(err){
        return res.render('error',{message:"an error occured during login"})
    }
}

module.exports = {
    handlelogin,handlesignup
}
