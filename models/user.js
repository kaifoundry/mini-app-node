const { DataTypes, ARRAY, ENUM } = require("sequelize");
const sequelize = require("../database"); // Ensure to configure the connection in this file

const Users = sequelize.define("User", {
    walletId:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    name:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    email:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    skills:{
        type:DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue:[]
    },
    // profile:{
    //     type:DataTypes.TEXT,
    //     allowNull:true
    // },
    isAdmin:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
});
module.exports = { Users };
