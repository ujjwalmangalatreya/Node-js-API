const express = require("express")

const jwt = require("jsonwebtoken")
const { ApiError } = require("../utils/ApiError")

const authClientToken = async (req, res,next) => {
     let token = req.headers['authorization']
     console.log(token,"::::::::::::::::::::::")

     if (!token) {
          return res.status(401).send(new ApiError(401, "Auth Token Not provided"))
          
     }

     
     next();
     
}

module.exports = { authClientToken }