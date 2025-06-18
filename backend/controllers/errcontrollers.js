const AppError=require('./../utils/appError')
const handleCastErrorDB=err=>{
    const message=`Invalid ${err.path}: ${err.value}`;
    return new AppError(message,400)
}
const handleDuplicateFieldsDB=err=>{
    //const value=err.errmsg.match(/([""])(\\?.)*?\1/)[0];
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message=`Duplicate field value>${value}`; 
    return new AppError(message,400);
}
const sendErrorDev=(err,res)=>{
  res.status(err.statusCode).json({
       status:err.status,
       stack:err.stack,
       error:err,
       message:err.message 
    })  
}
const sendErrorProd=(err,res)=>{
    if(err.isOperational){
      res.status(err.statusCode).json({
       status:err.status,
        message:err.message }) 
    }else{ 
        //console.error('ERROR',err)
        res.status(500).json({
            status:'error',
            //message:'Something went very wrong'--from the tutorial
            //my code
            message:err.message
        })
    }
     
     }
const handleJsonWebTokenError=err=>new AppError('Invalid Token',401);
module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.status=err.status||'error';
    // if(process.env.NODE_ENV==='development')
    // {
    //     sendErrorDev(err,res)
    if(process.env.NODE_ENV==='production'){
        let error=Object.assign(err);
        if (error.name==='CastError') error=handleCastErrorDB(error);
        if (error.code===11000) error=handleDuplicateFieldsDB(error);
        sendErrorProd(error,res)
        if (error.name==='JsonWebTokenError') error=handleJsonWebTokenError(error);
    }else if(process.env.NODE_ENV==='development'){
        console.log('development')
        sendErrorDev(err,res)
    }
    
    //next()
}