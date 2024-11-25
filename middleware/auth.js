const jwt = require('jsonwebtoken')

const secretKey = "bibidiegy4y983232odoije94i743y27"

function genratetoken(user){
    return jwt.sign({id:user._id}, secretKey,{expiresIn:'1h'})
}

function authenticatetoken(req,res,next){
    const header = req.headers.authorization
    if(!header){
       return res.redirect('/login')
    }
    const token = header.split(' ')[1]
    if (!token) {
        return res.redirect('/login');
    }
    

    jwt.verify(token,secretKey,(err,decoded)=>{
        if (err) {
           
            return res.redirect('/login');
        }
        req.user = decoded
        next();
    })
}

module.exports = {genratetoken,authenticatetoken}