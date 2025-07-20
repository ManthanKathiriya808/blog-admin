const admin = require("../models/adminSchema")
const moment = require("moment")

module.exports.dashboard =  (req,res)=>{

    try {
        
        return res.render("dashboard")

    } catch (error) {
        console.log(error)
        return res.redirect("/admin")
        
    }
}


module.exports.addAdmin = (req,res)=>{
    try {
        return res.render("addAdmin")
    } catch (error) {
           console.log(error)

        return false
    }
}
module.exports.viewAdmin =async (req,res)=>{
    try {

        let adminData = await admin.find({})
        return res.render("viewAdmin",{
            adminData
        })
    } catch (error) {
                console.log(error)

        return false
    }
}


module.exports.insertdata = async (req,res)=>{

    let {name,fname,lname,email,password,message,city,gender,qualification} = req.body
    let photo = req.file.path

   name = fname + " " + lname;
   
   try {
        
        const adminData = await admin.create({
            name,
            email,
            password,
            message,
            city,
            gender,
            qualification,
            photo
        })
        
        console.log("data added successfully")

        return res.redirect("/admin/view_admin")

    } catch (error) {
        console.log(error)

        return false
    }
}


module.exports.deleteAdmin = async (req,res)=>{



    try {
        
     const id = req.params.id

        const deleteAdmin = await admin.findByIdAndDelete(id)

        console.log("data deleted successfully")
       
        return res.redirect("/admin/view_admin")

    } catch (error) {
            console.log(error)

        return false
    }
}


module.exports.updateAdmin = async (req,res)=>{
      

    try {
        
        const id = req.params.id
        const update = await admin.findById(id)

        return res.render("updateAdmin",{
            update
        })

    } catch (error) {
        console.log(error)

        return false
    }
}