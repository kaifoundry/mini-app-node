const { where, Op } = require("sequelize")
const { Users } = require("../models/user")
const { Links } = require("../models/link")
const { Applications } = require("../models/application")

async function createUser(req,res){
    try{
        const {user,name,email}=req.body

        console.log(user,name,email)

        const duplicate=await Users.findOne({where:{walletId : user}})
        console.log(duplicate)

        if(duplicate!=null){
            return res.json({message:"user already exists"})
        }

        const userCount=await Users.count({})

        await Users.create({
            walletId:user,
            name:name,
            email:email,
            isAdmin:false,
            rank:userCount+1
        })

        return res.json({message:"User created successfully"})
    }catch(err){
        console.log(err)
        return res.json({message:"some err"})

    }
}

async function updateUser(req,res){
    try{
        const {wallet,name,email,img}=req.body
        console.log(wallet)
        const user=await Users.findOne({where:{walletId:wallet}})
        if(user==null){
            return res.json({message:"no user exists with this walletid"})
        }
        user.name=name
        user.email=email
        user.profile=img
        await user.save()
        return res.json({message:"profile updated",user:user})
    }catch(err){
        console.log(err)
        return res.json({message:"some err"})
    }
}


async function getUser(req,res){
    try{
        const {wallet} = req.query
        console.log(wallet)
        const user = await Users.findOne({where:{walletId:wallet}})
        console.log(user)
        if(user==null){
            return res.json({message:"no user exists with this walletid"})
        }
    
        return res.json({message:user})
    }catch(err){
        console.log(err)
        return res.json({message:"some err"})
    }

}

async function getTop10Users(req,res){
    try{
        const {wallet} = req.query
        let userData=[]
        const user = await Users.findOne({where:{walletId:wallet}})
        const users = await Users.findAll({where:{rank:{[Op.lte]:10}}})
        for(let i=0;i<users?.length;i++){
            let appCount=await Applications.count({where:{refBy:users[i]?.dataValues?.walletId,rating:{[Op.gte]:3}}})
            let userEl={
                name:users[i]?.dataValues?.name,
                rank:users[i]?.dataValues?.rank,
                referrals:appCount,
                wallet:users[i]?.dataValues?.walletId
            }
            console.log(userEl)
            userData.push(userEl)
        }
        return res.json({message:'users found',users:userData,self:user})
    }catch(err){
        console.log(err)
        return res.json({message:"some err"})
    }
}

async function updateUserRankings(req,res){
    try{
        const users=await Users.findAll({order:[['createdAt','ASC']]})
        if(users==null||users?.length==0){
            return
        }
        let userList=[]
        for(let i=0;i<users?.length;i++){
            let appCount=await Applications.count({where:{refBy:users[i]?.dataValues?.walletId,rating:{[Op.gte]:3}}})
            userList.push({
                wallet:users[i]?.dataValues?.walletId,
                refs:appCount
            })
        }
        userList.sort((a,b)=>(a.refs>b.refs?1:b.refs>a.refs?-1:0))
        for(let i=0;i<userList?.length;i++){
            let user=await Users.findOne({where:{walletId:userList[i].wallet}})
            user.rank=(userList?.length-i)
            await user.save()
        }
        console.log(userList)

    }catch(err){
        console.log(err)
        return res.json({message:"some err"})
    }
}

module.exports={
    createUser,
    getUser,
    updateUser,
    getTop10Users,
    updateUserRankings
}