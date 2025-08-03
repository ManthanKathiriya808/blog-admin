
const express = require("express")

const adminCtl = require("../controller/adminCtl")
const routes = express.Router()
const admin = require("../models/adminSchema")
const passport = require("passport")

routes.get("/", adminCtl.authLogin)
routes.get("/dashboard",passport.isAuth, adminCtl.dashboard)
routes.post("/loginAdmin",passport.authenticate('local', { failureRedirect: '/admin'  }), adminCtl.loginAdmin)
routes.get("/add_admin",passport.isAuth, adminCtl.addAdmin)
routes.get("/view_admin",passport.isAuth, adminCtl.viewAdmin)
routes.post("/insertdata",passport.isAuth, admin.uploadAdminImage ,adminCtl.insertdata)
routes.get("/delete/:id",passport.isAuth, adminCtl.deleteAdmin)
routes.get("/update/:id",passport.isAuth, adminCtl.updateAdmin)
routes.get("/adminProfile", passport.isAuth, adminCtl.adminProfile)
routes.get("/searchAdminData", adminCtl.searchAdminData)
routes.post("/updataAdminData", admin.uploadAdminImage, adminCtl.updataAdminData)
routes.post("/changePass",adminCtl.changePass)
routes.get("/logout",function(req,res,next){
    req.logout(function(err){
        if(err){
            return next(err)
        }
        res.redirect("/admin/")
    })
})

routes.get("/changePassword",passport.isAuth,adminCtl.changePassword)
routes.get("/forgotPassEmail",adminCtl.forgotPassEmail)
routes.post("/forgotPassEmail",adminCtl.forgotPassEmails)

routes.use("/blog",passport.isAuth,require("../routes/blog"))
module.exports = routes