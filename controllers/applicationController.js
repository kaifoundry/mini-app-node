const { Applications } = require("../models/application")
const { Jobs } = require("../models/jobs")
const { Links } = require("../models/link")
const { Users } = require("../models/user")

async function getAllApplications(req,res){
    try{
        const {jobID}=req.query
        // console.log(wallet)
        
        const applications=await Applications.findAll({where:{jobId:jobID}})
        if(applications==null || !(applications?.length>0)){
            return res.json({message:"no applications found"})
        }
        console.log(applications)
        return res.json({message:'applications found',applications:applications})
    }catch(err){
        console.log(err)
        return res.json({message:"Something went wrong"})
    }
}

async function getAllRefApplications(req,res){
    try{
        const {wallet}=req.query
        let resArr=[]
        let applicationArr=[]
        const links=await Links.findAll({where:{generatedBy:wallet,isActive:false},group:Links.jobId})
        if(links==null||links?.length==0){
            return res.json({message:'No candidates found'})
        }
        for(let i=0;i<links?.length;i++){
            let application=await Applications.findOne({where:{ref:links[i]?.dataValues?.ref}})
            console.log(application?.dataValues,links?.[i]?.dataValues)
            if(application==undefined){
                continue
            }
            const user=await Users.findOne({where:{walletId:application?.dataValues?.candidate}})
            if(user==undefined){
                continue
            }
            applicationArr?.push({...application?.dataValues,candidateData:user?.dataValues})
        }
        let currJob={
            index:0,
            id:applicationArr[0]?.jobId,
            name:''
        }
        console.log(applicationArr)
        for (let i=0;i<applicationArr?.length;i++){
            console.log(currJob)
            if(currJob.id!=applicationArr[i]?.jobId || currJob.name==''){
                let job=await Jobs.findOne({where:{jobId:applicationArr[i]?.jobId}})
                currJob.id=job?.dataValues?.jobId
                if(currJob.name!='') currJob.index+=1;
                currJob.name=job?.dataValues?.title
                console.log(currJob)
                resArr.push([])
                resArr[currJob.index]?.push(currJob.name)
            }
            console.log(currJob)
            resArr[currJob.index]?.push(applicationArr[i])
            console.log(currJob,applicationArr[i])

            console.log(resArr)
        }
        return res.json({message:'candidates found',candidates:resArr})
    }catch(err){
        console.log(err)
        return res.json({message:"Something went wrong"})
    }
}

async function getRedeemableApplications(req,res){
    try{
        const {wallet}=req.query
        const links=await Links.findAll({where:{generatedBy:wallet,isActive:false}})
        let count=0
        for(let i=0;i<links?.length;i++){
            let application=await Applications.findOne({where:{ref:links[i]?.dataValues?.ref}})
            if(application.dataValues.rating>3 && !application.dataValues.isRewardRedeemed){
                count+=1
            }
        }
        return res.json({message:"redeemable bounties found",count:count})        
    }catch(err){
        console.log(err)
        return res.json({message:"Something went wrong"})
    }
}

async function removeAllRedeemableApplications(req,res){
    try {
        const {wallet}=req.query
        const links=await Links.findAll({where:{generatedBy:wallet,isActive:false}})
        for(let i=0;i<links?.length;i++){
            let application=await Applications.findOne({where:{ref:links[i]?.dataValues?.ref}})
            application.isRewardRedeemed = true
            await application.save()
        }
        return res.json({message:"Bounties will be redeemed after transaction"})
    } catch (err) {
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
            ref:ref,
            refBy:link?.dataValues?.generatedBy,
            isRewardRedeemed:false
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
    getAllRefApplications,
    createApplication,
    getRedeemableApplications,
    removeAllRedeemableApplications
}