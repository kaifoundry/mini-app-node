const { DataTypes, ARRAY, ENUM } = require("sequelize");
const sequelize = require("../database"); // Ensure to configure the connection in this file

const Jobs = sequelize.define("Job", {
    jobId:{
        type:DataTypes.TEXT
    },
    title:{
        type:DataTypes.TEXT
    },
    company:{
        type:DataTypes.TEXT
    },    
    bounty:{
        type:DataTypes.TEXT
    },    
    jobDetail:{
        type:DataTypes.TEXT
    },    
    logo:{
        type:DataTypes.TEXT
    },    
    aboutCompany:{
        type:DataTypes.TEXT
    },    
    candidateReq:{
        type:DataTypes.TEXT
    },    
    jobReq:{
        type:DataTypes.TEXT
    },
    skills:{
        type:DataTypes.ARRAY(DataTypes.TEXT)
    },
    tags:{
        type:DataTypes.ARRAY(DataTypes.TEXT)
    },
});
module.exports = { Jobs };
