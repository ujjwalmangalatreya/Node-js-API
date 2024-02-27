
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { router } = require("./routes/all.routes.js")

//Create an express application
const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())
app.use("/", router);
module.exports = { app }


