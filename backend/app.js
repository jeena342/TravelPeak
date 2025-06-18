const express= require('express')
const cors = require('cors');
const qs=require('qs')
const app=express()
const globalErrorHandler=require('./controllers/errcontrollers')
const AppError= require("./utils/appError")
const toursRouter=require('./routes/toursRoutes');
const userRouter=require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const rateLimit = require('express-rate-limit');

app.set('query parser', str => qs.parse(str));
app.use(express.json());
app.use(cors());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);
//app.use(express.static(`${__dirname}`))
//app.get(,gettours);
//app.post('/api/v1/tours',posttours)
//app.post('/',(req,res)=>
//res.send("post"))

app.use('/api/v1/tours',toursRouter);
app.use('/api/v1/user',userRouter)
app.use('/api/v1/reviews', reviewRouter);
app.all('*',(req,res,next)=>{
    // const err=new Error(`can't find ${req.originalUrl} on this server`)
    // err.status='fail';
    // err.statusCode=404;


    next(new AppError(`can't find ${req.originalUrl} on this server`,404))
})
app.use(globalErrorHandler)
module.exports=app;