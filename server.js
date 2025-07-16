const express = require("express")
const path = require("path")
const port = 4000;
 
const app = express()

app.set("view engine", "ejs")

app.use("/",express.static(path.join('public')))
app.use("/", require("./routes/index"))


app.listen(port,(err)=>{

    err? console.log(err) : console.log(`server is connected at port : ${port}`)
})