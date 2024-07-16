const { Applications } = require("../models/application")
const { Links } = require("../models/link")

async function getAllApplications(req,res){
    try{
        const {jobID}=req.query
        console.log(jobID)

        const applications=await Applications.findAll({where:{jobId:jobID}})
        console.log(applications)
        if(applications==null){
            return res.json({message:"No applications found for this job"})
        }
        return res.json({message:"applications found",applications:applications})

    }catch(err){
        console.log(err)
        return res.json({message:"Something went wrong"})
    }
}

async function createApplication(req,res){
    try{
        const {candidate,skills,ref}=req.body
        console.log(skills,candidate,ref)

        if(ref==undefined || candidate==undefined || skills==undefined ){
            return res.json({message:"Do not send empty fields"})
        }
    
        let rating = Math.floor(Math.random()*5)+1

        let link=await Links.findOne({where:{ref:ref}})

        if(link==null){
            return res.json({message:"invalid referral"})
        }
        if(!link.isActive){
            return res.json({message:"One referral is valid for only one user"})
        }
    
        await Applications.create({
            jobId:link.jobId,
            candidate:candidate,
            skills:skills,
            rating:rating,
            ref:ref
        })
        link.isActive=false
        await link.save()
        return res.json({message:`Your application is received, you have received a rating of ${rating}`,rating:rating,success:true})
    }catch(err){
        console.log(err)
        return res.json({message:"Something went wrong"})  
    }
   
}

module.exports={
    getAllApplications,
    createApplication
}