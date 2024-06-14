const { Jobs } = require("../models/jobs")

async function createJob(req,res){
    try{
        const {bounty,name,des}=req.body

        const jobs=await Jobs.findAll({})

        let jobId=jobs.length+1

        await Jobs.create({
            jobId:jobId,
            bounty:bounty,
            name:name,
            des:des
        })

        return res.json({message:"Job created succesfully"})
    }catch(err){
        console.log(err)
        return res.json({message:"Something went wrong"})
    }
}

async function getJobDetails(req,res){
    try{
        const {jobId}=req.query

        const job=await Jobs.findOne({where:{jobId:jobId}})

        if(job==null){
            return res.json({message:"No job found with this ID"})
        }

        return res.json({message:"Job found",job:job})

    }catch(err){
        console.log(err)
        return res.json({message:"Something went wrong"})
    }    
}

async function getAllJobs(req,res){
    try{
        let jobs=await Jobs.findAll({})
        return res.json({message:"All the jobs returned : ",jobs:jobs})
    }catch(err){
        console.log(err)
        return res.json({message:"Something went wrong"})
    }    
}

module.exports={
    createJob,
    getAllJobs,
    getJobDetails
}