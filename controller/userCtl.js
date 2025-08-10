const blogs = require("../models/blogSchema")
const categories = require("../models/categorySchema")

module.exports.dashboard = async (req,res)=>{

    try {
        const blog = await blogs.find({})
        const category = await categories.find({})
        return res.render("user/index",{
            blog,
            category
        })
    } catch (error) {
        console.log(error)
        return false
    }
}
module.exports.blogDetails = async (req,res)=>{
    let id = req.params.id
    
    try {
        let data = await blogs.findById(id)
        return res.render("user/singleBlog",{
            data
        })
    } catch (error) {
        console.log(error)
        return false
    }
}