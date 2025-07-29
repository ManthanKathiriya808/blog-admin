
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
routes.get("/searchAdminData", adminCtl.searchAdminData)
routes.post("/updataAdminData", admin.uploadAdminImage, adminCtl.updataAdminData)
module.exports = routes