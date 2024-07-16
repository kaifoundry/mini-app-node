const { DataTypes, ARRAY, ENUM } = require("sequelize");
const sequelize = require("../database"); // Ensure to configure the connection in this file

const Applications = sequelize.define("Application", {
    candidate:{
        type:DataTypes.TEXT
    },
    jobId:{
        type:DataTypes.TEXT
    },
    rating:{
        type:DataTypes.NUMBER
    },
    skills:{
        type:DataTypes.ARRAY(DataTypes.TEXT)
    },
    ref:{
        type:DataTypes.TEXT
    }
});
module.exports = { Applications };
