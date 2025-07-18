const admin = require("../models/adminSchema")


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
module.exports.viewAdmin = (req,res)=>{
    try {
        return res.render("viewAdmin")
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