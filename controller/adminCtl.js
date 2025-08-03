const admin = require("../models/adminSchema")
const nodemailer = require("nodemailer");
const moment = require("moment")

module.exports.dashboard =  (req,res)=>{

    try {
        
        return res.render("dashboard")

    } catch (error) {
        console.log(error)
        return res.redirect("/admin")
        
    }
}
module.exports.authLogin =  (req,res)=>{

    try {
        
        return res.render("authLogin")

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
        let page = 0
        if(req.query.page){
            page = req.query.page
        }

        let search = ""
        
        if(req.query.searchAdmin){
            search = req.query.searchAdmin
        }


        let perPage = 2
        let adminData = await admin.find({
            $or : [
                { name : {$regex : search , $options : "i"}},
                { email : {$regex : search , $options : "i"}},
                { city : {$regex : search , $options : "i"}},
                { gender : {$regex : search , $options : "i"}},
                { qualification : {$regex : search , $options : "i"}},
            ]
        }).sort({_id : -1}).skip(page*perPage).limit(perPage)

        let countAllAdminRecord = await admin.find({
            $or : [
                { name : {$regex : search , $options : "i"}},
                { email : {$regex : search , $options : "i"}},
                { city : {$regex : search , $options : "i"}},
                { gender : {$regex : search , $options : "i"}},
                { qualification : {$regex : search , $options : "i"}},
            ]
        }).countDocuments()

       let totalPage = Math.ceil(countAllAdminRecord/perPage)

        return res.render("viewAdmin",{
            adminData, totalPage , search, page
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


module.exports.updataAdminData = async (req,res)=>{

    let {id,name,fname,lname,email,password,message,city,gender,qualification} = req.body
    
    try {
        
        const admins = admin.findById(id)

        if(!admins){
            console.log("User not found")
            return res.redirect("/admin/view_admin")
        }

        const updatedData = {
            name: fname + " " + lname,
            email,
            password,
            message,
            city,
            gender,
            qualification
        }

        if(req.file){
            if(admins.photo && fs.existsSync(admins.photo)){
                fs.unlinkSync(admins.photo)
            }
            updatedData.photo = req.file.path
            
        }

        const updateAdmin = await admin.findByIdAndUpdate(id, updatedData)

        console.log("data updated successfully")
        return res.redirect("/admin/view_admin")
        }



        catch (error) {
           console.log(error)
           return false
       }
    }

// searching and pagination

module.exports.searchAdminData = async (req,res)=>{

    try {
        let search = ''

        if(req.query){
            search = req.query.searchAdmin
        }

        let page = 0 
        let perPage = 2

        let searchData = await admin.find({

            $or : [
            { name: { $regex : search, $options : "i" } },
            {email : { $regex : search, $options:"i"}},
            {city : { $regex : search,$options:"i"}},
            {gender : { $regex : search,$options:"i"}},
            {qualification : { $regex : search,$options:"i"}}
            ]
        }).skip(page*perPage).limit(perPage)

        console.log(searchData)
        return res.render("viewAdmin", {
            adminData : searchData
        })

    } catch (error) {
        console.log(error)
        return res.redirect("/admin/view_admin")
    }
}


module.exports.loginAdmin =  (req,res)=>{
    try {
        if(req.user){
            console.log("login successfully")

            return res.redirect("/admin/dashboard")
        }

        return res.redirect("/admin")
    } catch (error) {
        console.log(error)
        return res.redirect("/admin")
    }
}


module.exports.adminProfile = (req,res)=>{

    try {
        
        return res.render("adminProfile")
    } catch (error) {
        console.log(error)
        return false
    }
}
module.exports.changePassword = (req,res)=>{



    try {
        
        return res.render("changePassword")
    } catch (error) {
        console.log(error)
        return false
    }
}



module.exports.changePass = async (req,res)=>{
    const {oldPass,newPass,confPass} = req.body
    try {
        
    if(!oldPass && !newPass && !confPass){

         console.log("All fields are required");
      return res.redirect("/admin/changePassword");
        
    }
   
    if (newPass !== confPass) {
      console.log("New password and confirm password do not match");
      return res.redirect("/admin/changePassword");
    }

    const admins = await admin.findById(req.user.id)
    
    if(oldPass === admins.password){
        if(oldPass != newPass){
            
            const user = await admin.findByIdAndUpdate(admins.id,{password: newPass})
            console.log("password Changed")
            return res.redirect("/admin/dashboard")
        }
         else{
            console.log("both password are same")
            return res.redirect("/admin/changePassword");
        }
    }
      else{
            console.log("both password are same")
            return res.redirect("/admin/changePassword");
        }


    } catch (error) {
        console.log(error)
        return false
    }
}


module.exports.forgotPassEmail = (req,res)=>{

    try {
        
        return res.render("forgortPassEmail")

    } catch (error) {
        console.log(error)
        return res.redirect("/admin/")
    }
}
module.exports.forgotPassEmails = async (req,res)=>{
    
    const {email}  = req.body

    try {
        
        const admins = await admin.findOne({email:email})
       if(!admins){
                console.log("No User Found")
        return res.redirect("/admin/")
       }
       const otp = Math.round(Math.random*10000)


       const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "manthankathiriya808@gmail.com",
    pass: "",
  },
});


  const info = await transporter.sendMail({
    from: '"Admin Pannel" <manthankathiriya808@gmail.com>',
    to: email,
    subject: "Lost Password OTP",
    text: "OTP",
    html: `your otp is : ${otp}`, 
  });

  console.log("Message sent:", info.messageId);

  if(info){
    console.log("otp send successfully")

                             
  }


    } catch (error) {
        console.log(error)
        return res.redirect("/admin/")
    }
}
