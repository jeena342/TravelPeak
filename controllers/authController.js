const catchAsync = require('./../utils/catchAsync');
const User=require('./../models/userModels');
const {promisify}=require('util');
const jwt=require('jsonwebtoken');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');
const errcontrollers = require('./errcontrollers');
const signupToken=id=>{
    return jwt.sign({id},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRES_IN}
    )}

exports.signup=catchAsync(async(req,res,next)=>{
    const newUser=await User.create(req.body);
    const token=signupToken(newUser._id)
   // console.log(token)
    res.status(201).json({
        status:'success',
        data:{
            token,
            user:newUser,
        }
    })
   //console.log("hai")
})
exports.login=catchAsync(async(req,res,next)=>{
    const {email,password}=req.body;
    
    if(!email||!password){
        //console.log("email or password missing")
        return next(new AppError(`email or password missing`,400));
    }
    const user=await User.findOne({email}).select('+password')
    const correct=await user.correctpassword(password,user.password)
    console.log(correct)
    if(!email||!(await user.correctpassword(password,user.password)))
    {   //console.log("error")
        return next(new AppError(`incorret email or password`,401));
    }
    const token=signupToken(user._id)
    res.status(201).json({
        status:"success",
        token,
    })

})
exports.protect=catchAsync(async(req,res,next)=>{
     let token;
     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
     {
      token=req.headers.authorization.split(' ')[1];
     }
     //console.log(token)
    if(!token)
    {   
        return next(new AppError('You are not logged in! Please login'))
    }
    const decode=await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    console.log(decode)
    const freshuser=await User.findById(decode.id)
    //console.log("hai",freshuser)
     if(freshuser===null){
         return next(new AppError('No user exist'))
     }

     if (freshuser.changedPasswordAfter(decode.iat)){
        return next( new AppError('Password recently changed',401)
        )
     }
     req.user=freshuser;
     
    next();
})
exports.restrictTo=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
                new AppError('You do not have permission to perform this action',403)
            );
    }
    next();
} 
}
exports.forgetPassword=catchAsync(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});
    if (!user){
        return next(new AppError('There is no user with email address',404));
    }
    const resetToken=user.createForgetPasswordToken();
    await user.save({validateBeforeSave: false})
    const resetURL=`${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    const message=`forget password ${resetURL}`;
try{  
    await sendEmail({
        email:user.email,
        subject:'Your password reset token (valid for 10 min)',
        message
    })
    res.status(200).json({
        status:'success',
        message:'Token sent to email'
    })
}catch(err){
    user.passwordResetToken=undefined;
    user.passwordResetExpires=undefined;
    await user.save({validateBeforeSave: false})
    //const message=err
    console.log(err)
    //return next(new AppError('There was an error in sending the email.Try again later',500));
    return "1"
}

})