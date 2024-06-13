const { Users } = require("../models/user")

async function createUser(req,res){
    try{
        const {user,name,email}=req.body

        console.log(user,name,email)

        const duplicate=await Users.findOne({where:{walletId : user}})
        console.log(duplicate)

        if(duplicate!=null){
            return res.json({message:"user already exists"})
        }

        await Users.create({
            walletId:user,
            name:name,
            email:email
        })

        return res.json({message:"User created successfully"})
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

module.exports={
    createUser,
    getUser,
}