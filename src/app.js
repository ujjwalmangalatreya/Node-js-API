
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

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


const PORT = process.env.PORT || 3000;

module.exports = { app }


