const Url = require('../models/url')
const shortid = require('shortid')

async function handlepost(req,res){
    const url = req.body.url
    if(!url){
        res.render('home',{error:"url is required",shortUrl:null})
    }
    try{
        const short = shortid()
        await Url.create({
            URL:url,
            ShortID:short,
            VisitorHistory:[]
    
        })
        const shortUrl = `http://localhost:8001/api/${short}`
        res.render('home',{error:null,shortUrl})

    }catch(err){
         res.render('error',{message:"server is not responding"})
    }
    
}

async function handleget(req,res){
    const ShortID = req.params.ShortID
    if(!ShortID){
        res.render('error',{message:"shortid is required"})
    }
    
    try{
        const result = await Url.findOneAndUpdate({
            ShortID
        },
        {
            $push:{
                VisitorHistory:{timestamp:Date.now()}
            }
        },{new:true})
        if (!result) {
            res.render('error',{ error: "URL not found" });
        }

        res.redirect(result.URL)

    }catch(err){
         res.render('error',{message:"server is not responding"})
    }

}

async function homepage(req,res){
    return res.render('home',{error:null, shortUrl:null})
}

async function handledetail(req,res){
    const ShortID = req.params.ShortID
    if(!ShortID){
        res.render('error',{message:"shortid is required"})
    }
    console.log(ShortID)
    try{
        const result = await Url.findOne({ShortID})
        console.log(result.URL)
        if(!result){
            res.render('error',{message:"url not found"})
        }
    
        res.render('details',{
            url:result.URL,
            shortUrl:result.ShortID,
            visitorCount:result.VisitorHistory.length,
        })

    }catch(err){
        res.render('error',{message:"server is not responding"})
    }
}

module.exports = {
    handledetail,
    handleget,
    handlepost,
    homepage
}
