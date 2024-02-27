const dotenv = require("dotenv");
const { app } = require("./app.js"); // Assuming app is exported from app.js
const { dbConnect } = require("./db/db_connection.js");
const { sequelize } = require("./db/db_connection");




dotenv.config({
    path: './.env'
});

dbConnect()
  .then(  () => {
      const port = process.env.SERVER_PORT || 3000; // Define port
      app.listen(port, () => {
        console.log(`⚙️ Server is running at port ${port}`);

    });
  })
  .catch((err) => {
      console.error(":::::Server Connection FAILED:::::", err);
  });

