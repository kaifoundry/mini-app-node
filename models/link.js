const { DataTypes, ARRAY, ENUM } = require("sequelize");
const sequelize = require("../database"); // Ensure to configure the connection in this file

const Links = sequelize.define("Link", {
    generatedBy:{
        type:DataTypes.TEXT
    },
    jobId:{
        type:DataTypes.TEXT
    },
    link:{
        type:DataTypes.TEXT
    },
    ref:{
        type:DataTypes.TEXT
    },
    isActive:{
        type:DataTypes.BOOLEAN
    }
});
module.exports = { Links };
