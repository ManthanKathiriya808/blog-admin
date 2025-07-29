const express = require("express")
const path = require("path")
const port = 4000;
 const db = require("./config/db")
 const passport = require("passport")
 const localStrategy = require("./config/passLocal")
const session = require("express-session")
const app = express()

app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))
app.use("/",express.static(path.join('public')))
app.use("/uploads",express.static(path.join(__dirname,"/uploads")))

app.use(session({
    name:"Admin",
    secret:"Admin",
    resave:false,
    saveUninitialized:false,
    proxy:true,
    cookie:{
        maxAge:1000*60*60*24
    }

}))

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.userAuth)
app.use("/", require("./routes/index"))


app.listen(port,(err)=>{

    err? console.log(err) : console.log(`server is connected at port : ${port}`)
})