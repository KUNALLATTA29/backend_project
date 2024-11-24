const Url = require('../models/url')
const shortid = require('shortid')

async function handlepost(req,res){
    const url = req.body.url
    if(!url){
        return res.status(400).json({error:"url is required"})
    }
    try{
        const short = shortid()
        await Url.create({
            URL:url,
            ShortID:short,
            VisitorHistory:[]
    
        })
        return res.status(200).json({id:short})

    }catch(err){
        return res.json({error:"server is not responding",err})
    }
    
}

async function handleget(req,res){
    const ShortID = req.params.ShortID
    if(!ShortID){
        return res.status(400).json({error:"shortid is required"})
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
            return res.status(404).json({ error: "URL not found" });
        }
        if (!result.URL) { 
            return res.status(500).json({ error: "URL is missing in the database" });
        }
        console.log(">>>>>>>>>>>>>url>>>>>>>>>",result.URL)
    
        return res.redirect(result.URL)

    }catch(err){
        return res.status(500).json({error:"server is not responding",err})
    }

}

async function handledetail(req,res){
    const ShortID = req.params.ShortID
    if(!ShortID){
        return res.status(400).json({error:"shortid is required"})
    }
    console.log(ShortID)
    try{
        const result = await Url.findOne({ShortID})
        console.log(result.URL)
        if(!result){
            return res.status(404).json({error:"url not found"})
        }
    
        return res.status(200).json(result.VisitorHistory.length)

    }catch(err){
        return res.status(500).json({error:"server is not responding",err})
    }
}

module.exports = {
    handledetail,
    handleget,
    handlepost
}