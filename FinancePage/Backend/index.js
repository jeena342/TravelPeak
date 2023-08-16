const express=require("express")
const mongoose=require("mongoose")
const app=express()
const router1=require("./router")
const cors=require("cors")
app.use(cors())
const url="mongodb://localhost/Adminpage"
mongoose.set("strictQuery",true)
mongoose.connect(url,{useNewUrlParser:true})
const con=mongoose.connection
con.on("open",()=>
console.log("database connected"))

app.use(express.json())
app.use("/age",router1)
app.listen(9000,()=>
console.log("connected"))