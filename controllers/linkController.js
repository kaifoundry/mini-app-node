const { Jobs } = require("../models/jobs")
const { Links } = require("../models/link")

async function createLink(req,res){
    try{
        const {generatedBy,jobId,link,ref}=req.body

        console.log(req.body)

        if(ref==undefined || generatedBy==undefined || jobId==undefined || link==undefined){
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
            ref:ref,
            jobId:jobId,
            isActive:true
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
async function getAllLinks(req,res){
    try{
        const {user,job}=req.query
        console.log(user,job)

        const links=await Links.findAll({where:{generatedBy:user,jobId:""+job}})

        console.log(links,links?.length)
        if(links!=null && links?.length>0){
            return res.json({message:"links found",links:links})
        }
        return res.json({message:"no links found"})

    }catch(err){
        console.log(err)
        return res.json({message:"something went wrong"})
    }
}

async function getAllActiveLinks(req,res){
    try{
        const {wallet}=req.query
        console.log(wallet)
        let linkArr=[]
        
        const links=await Links.findAll({where:{generatedBy:wallet},group:Links.jobId})
        if(links==null || !(links?.length>0)){
            return res.json({message:"no links found"})
        }
        let currJob={
            id:links?.[0]?.jobId,
            name:'',
            index:0
        }
        for(let i=0;i<links?.length;i++){
            if(currJob.id!=links?.[i]?.jobId || currJob.name==''){
                currJob.id=links?.[i]?.jobId
                if(currJob.name!='') currJob.index+=1;
                const job=await Jobs.findOne({where:{id:links?.[i]?.jobId}})
                currJob.name=job?.title
                linkArr.push([])
                linkArr[currJob.index].push(currJob.name)
            }
            linkArr[currJob.index].push(links?.[i]?.dataValues)
            console.log(currJob,links?.[i]?.dataValues)

            console.log(linkArr)

        }
        return res.json({message:'links found',links:linkArr})
    }catch(err){
        console.log(err)
        return res.json({message:"something went wrong"})
    }
}

module.exports={
    createLink,
    getLink,
    getAllLinks,
    getAllActiveLinks
}