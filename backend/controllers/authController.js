const catchAsync = require('./../utils/catchAsync');
const User=require('./../models/userModels');
const crypto=require('crypto')
const {promisify}=require('util');
const jwt=require('jsonwebtoken');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');
//const errcontrollers = require('./errcontrollers');
const signupToken=id=>{
    return jwt.sign({id},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRES_IN}
    )}

const createSendToken=(user,statusCode,res)=>{
   const token=signupToken(user._id)
   // console.log(token)
   const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.password = undefined;
    res.status(statusCode).json({
        status:'success',
        data:{
            token,
            user,
        }
    }) 
}
exports.signup=catchAsync(async(req,res,next)=>{
    const newUser=await User.create(req.body);
    createSendToken(newUser,201,res)
    
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
    createSendToken(user,200,res)
    
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

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user,200,res)
  
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctpassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});