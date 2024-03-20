const {Sequelize} = require("sequelize")

const sequelize = new Sequelize("musical","postgres","ujjwal",{
    host : "localhost",
    dialect : "postgres"
});

const dbConnect = async ()=>{
    try{
        await sequelize.authenticate();
        console.log("Connection has been established successfully");
        await sequelize.sync();
        console.log("Database synced successfully");
    }catch (err){
        console.log("Unable to connect to the database",err);
    }
}

module.exports ={dbConnect, sequelize }
