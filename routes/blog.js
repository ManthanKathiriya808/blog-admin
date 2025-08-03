const express = require("express")
const blogCtl = require("../controller/blogCtl")
const blog = require("../models/blogSchema")
const routes = express.Router()

routes.get("/addBlog",blogCtl.addBlog)
routes.get("/viewBlog",blogCtl.viewBlog)

module.exports = routes