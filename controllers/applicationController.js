const { Applications } = require("../models/application")

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
        const {jobId,candidate,skills}=req.body

        if(jobId==undefined || candidate==undefined || skills==undefined ){
            return res.json({message:"Do not send empty fields"})
        }
    
        let rating = Math.floor(Math.random()*5)+1
    
        await Applications.create({
            jobId:jobId,
            candidate:candidate,
            skills:skills,
            rating:rating
        })
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