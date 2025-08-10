const express = require("express")
const userCtl = require("../controller/userCtl")
const routes = express.Router()

routes.get("/", userCtl.dashboard)
routes.get("/blogDetails/:id", userCtl.blogDetails)

module.exports = routes