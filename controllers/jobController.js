const { Applications } = require("../models/application")
const { Jobs } = require("../models/jobs")
const { Links } = require("../models/link")

async function createJob(req,res){
    try{
        const {bounty,title,company,jobDetail,logo,aboutCompany,candidateReq,jobReq,skills,tags,isFeatured}=req.body

        const jobs=await Jobs.findAll({})

        let jobId=jobs.length+1

        await Jobs.create({
            jobId:jobId,
            bounty:bounty,
            title:title,
            company:company,
            jobDetail:jobDetail,
            logo:logo,
            aboutCompany:aboutCompany,
            jobReq:jobReq,
            candidateReq:candidateReq,
            skills:skills,
            tags:tags,
            isFeatured:isFeatured
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

        const job=await Jobs.findOne({where:{id:jobId}})

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

async function getAllFeaturedJobs(req,res){
    try{
        let jobs=await Jobs.findAll({where:{isFeatured:true}})
        return res.json({message:"All featured jobs returned : ",jobs:jobs})
    }catch(err){
        console.log(err)
        return res.json({message:"Something went wrong"})
    }
}
async function getAllUnFeaturedJobs(req,res){
    try{
        let jobs=await Jobs.findAll({where:{isFeatured:false}})
        return res.json({message:"All unfeatured jobs returned : ",jobs:jobs})
    }catch(err){
        console.log(err)
        return res.json({message:"Something went wrong"})
    }
}

async function deleteJob(req,res){
    try{
        const {jobId}=req.query
        let applications=await Applications.findAll({where:{jobId:jobId}})
        let links=await Links.findAll({where:{jobId:jobId}})

        for(let i=0;i<applications?.length;i++){
            let application=await Applications.findOne({where:{id:applications[i]?.dataValues?.id}})
            await application.destroy()
        }
        for(let i=0;i<links?.length;i++){
            let link=await Links.findOne({where:{id:links[i]?.dataValues?.id}})
            await link.destroy()
        }
        let job=await Jobs.findOne({where:{id:jobId}})
        await job.destroy()
        return res.json({message:'deleted'})
    }catch(err){
        console.log(err)
        return res.json({message:"Something went wrong"})
    }
}

async function changeFeatureStatus(req,res){
    try{
        let {jobId,featureStatus}=req.body

        let job=await Jobs.findOne({where:{id:jobId}})
        job.isFeatured=featureStatus
        await job.save()
        return res.json({message:"Job feature status updated"})

    }catch(err){
        console.log(err)
        return res.json({message:"Something went wrong"})
    }
}

async function updateJob(req,res){
    try{
        const reqJob=req.body

        const job=await Jobs.findOne({where:{id:reqJob?.id}})

        if(job==null){
            return res.json({message:'No job found'})
        }

        job.title=reqJob?.title
        job.company=reqJob?.company
        job.bounty=reqJob?.bounty
        job.jobDetail=reqJob?.jobDetail
        job.logo=reqJob?.logo
        job.aboutCompany=reqJob?.aboutCompany
        job.candidateReq=reqJob?.candidateReq
        job.jobReq=reqJob?.jobReq
        job.skills=reqJob?.skills
        job.tags=reqJob?.tags
        job.isFeatured=req?.isFeatured

        await job.save()

        return res.json({message:"job updated successfully"})

    }catch(err){
        console.log(err)
        return res.json({message:"Something went wrong"})
    }
}

module.exports={
    createJob,
    getAllJobs,
    getJobDetails,
    deleteJob,
    getAllFeaturedJobs,
    getAllUnFeaturedJobs,
    changeFeatureStatus,
    updateJob
}