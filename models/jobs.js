const { DataTypes, ARRAY, ENUM } = require("sequelize");
const sequelize = require("../database"); // Ensure to configure the connection in this file

const Jobs = sequelize.define("Job", {
    jobId:{
        type:DataTypes.TEXT
    },
    name:{
        type:DataTypes.TEXT
    },
    des:{
        type:DataTypes.TEXT
    },
    bounty:{
        type:DataTypes.NUMBER
    }
});
module.exports = { Jobs };
