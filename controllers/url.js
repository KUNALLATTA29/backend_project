const shortid = require('shortid')
const url = require('../models/url')

async function createurl(req,res){
    const body = req.body
    if(!body.url){
        return res.status(404).json({error:"all fields are required"})
    }
    try{
        const shortId = shortid()
        await url.create({
            shortid:shortId,
            redirecturl:body.url,
            visitorHistory:[]
        })

        return res.status(200).json({id:shortId})

    }catch(err){
        return res.status(500).json({message:"there is error in server",err})
    }
}

async function handlegetreq(req,res){
    const shortId = req.params.shortid;
    const entry = await url.findOneAndUpdate(
        {
            shortId
        },
        {
            $push:{
                visitorHistory:{timestamp:Date.now()}
            }
        }
    );
    res.redirect(entry.redirecturl)
}

async function handledetails (req,res)
{
    const shortid = req.params.shortId;
    const result = await url.findOne({shortid})
    if (!result) {
        return res.status(404).json({ error: "URL not found" });
    }
    return res.json({
        totalClicks: result.visitorHistory.length,
        analytics:result.visitorHistory
    })
}

module.exports = {
    createurl,
    handlegetreq,
    handledetails
}