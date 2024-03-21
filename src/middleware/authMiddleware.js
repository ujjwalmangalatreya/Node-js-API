const express = require("express")

const jwt = require("jsonwebtoken")
const { ApiError } = require("../utils/ApiError")

const authClientToken = async (req, res, next) => {
     let token = req.headers['authorization']
     if (!token) {
          return res.status(401).send(new ApiError(401, "Auth Token Not provided"))
     }
     try {
          const decoded = jwt.verify(token, "nodeauthsecret")
          req.user = decoded
          next();
     } catch (err) {
          return res.status(401).send(new ApiError(401, "Auth Token Invalid"))
     }
}

module.exports = { authClientToken }