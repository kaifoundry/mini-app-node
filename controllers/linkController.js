const { Links } = require("../models/link")

async function createLink(req,res){
    try{
        const {generatedBy,jobId,link}=req.body

        console.log(req.body)

        if(generatedBy==undefined || jobId==undefined || link==undefined){
            return res.json({message:"Do not send empty fields"})
        }

        const linkVal=await Links.findOne({where:{link}})
        console.log(linkVal)

        if(linkVal!=null){
            return res.json({message:"Already created this link"})
        }

        await Links.create({
            generatedBy:generatedBy,
            link:link,
            jobId:jobId
        })

        return res.json({message:"Link created successfully"})

    }catch(err){
        console.log(err)
        return res.json({message:"something went wrong"})
    }
}
async function getLink(req,res){
    try{
        const {link}=req.query

        console.log(link)

        const linkVal=await Links.findOne({where:{link}})
        console.log(linkVal)
        if(linkVal==null){
            return res.json({message:"No such link for this user"})
        }

        return res.json({message:"link found",link:linkVal})

    }catch(err){
        console.log(err)
        return res.json({message:"something went wrong"})
    }
}

module.exports={
    createLink,
    getLink
}