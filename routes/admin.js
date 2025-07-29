
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
routes.get("/update/:id", adminCtl.updateAdmin)
routes.get("/adminProfile", passport.isAuth, adminCtl.adminProfile)
routes.get("/searchAdminData", adminCtl.searchAdminData)
routes.post("/updataAdminData", admin.uploadAdminImage, adminCtl.updataAdminData)
routes.get("/logout",function(req,res,next){
    req.logout(function(err){
        if(err){
            return next(err)
        }
        res.redirect("/admin/")
    })
})
module.exports = routes