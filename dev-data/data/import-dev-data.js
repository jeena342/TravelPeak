const mongoose= require('mongoose');
const Tour=require('./../../models/tourModels')
const dotenv=require("dotenv")
dotenv.config({path:'./config.env'})
const DB= process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));
const fs=require('fs')
const tours=JSON.parse(fs.readFileSync(`${__dirname}/tours-sample.json`,'utf-8'))
const importdata=async ()=>{
try{
  await Tour.create(tours);
  console.log('data successfully created')
  process.exit()
}catch(err){
  console.log(err)
}
}
const deleteTour=async ()=>{
try{
  await Tour.deleteMany();
  console.log("data deleted ")
  process.exit()
}catch(err){
  console.log(err)
}
}
if(process.argv[2]==='--import'){
  importdata()
}
else if(process.argv[2]==='--delete')
{
  deleteTour()
}