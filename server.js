const mongoose= require('mongoose');
const app=require("./app")
const dotenv=require("dotenv")
process.on('uncaughtException',err=>{
    console.log(err.name,err.message);
    console.log("unhandled exception! shutting down ");
            process.exit(1);
})
dotenv.config({path:'./config.env'})

const DB= process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB)
  .then(() => console.log("Connected to MongoDB"))
 // .catch(err => console.error("MongoDB connection error:", err));


/*mongoose.connect(DB,{
    useNewUrlParse:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>{
    console.log(con.connections);
    console.log('DB connections successful');  
})*/
console.log(app.get('env'))
const port=process.env||3000
const server=app.listen(port,()=>{
    console.log("successfully connected")
})

process.on('unhandledRejection',err=>{
    console.log(err.name,err.message);
    console.log("unhandled rejection! shutting down ");
    server.close(()=>{
        process.exit(1);
    })
});