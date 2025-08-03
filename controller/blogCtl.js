const blog = require("../models/blogSchema")

module.exports.addBlog = (req,res)=>{
    return res.render("addBlog")
}
module.exports.viewBlog = (req,res)=>{
    return res.render("viewBlog")
}