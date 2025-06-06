const mongoose=require('mongoose')
const validator=require('validator')
const crypto=require('crypto')
const bcrypt=require('bcrypt')
const userSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'A user must have a name'],
            
        },
        email:{
            type:String,
            required:[true,'A user must contain email'],
            unique: true,
            validate:[validator.isEmail,'Provide your email'],
            lowercase:true
        },
        photo:String,
        password:{
            type:"String",
            required:[true,'A user must contain password'],
            minlength:8,
            select:false
            
        },
        passwordConfirm:{
            type:'String',
            required:[true,'A user must contain email'],
            minlength:8,
                validate:{
                //only work on save
                validator:function(val){
                    return val===this.password;
                },
            message:"Password and Passwordconfirm must be same",
            }
        },
               
        passwordCreatedAt:Date,
        role:{
            type:'String',
            enum:['user','guide','lead-guide','admin']
        },
        passwordChangedAt:Date,
        passwordResetToken:String,
        passwordResetExpires:Date

    })
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password,12);
    this.passwordConfirm=undefined;
})
userSchema.methods.correctpassword=async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}
userSchema.methods.changedPasswordAfter=function(JWTTimeStamp){
    if(this.passwordCreatedAt){
        const changedTimestamp=parseInt(this.passwordCreatedAt.getTime())/1000;
        return JWTTimeStamp<changedTimestamp
    }
}
userSchema.methods.createForgetPasswordToken=function(){
    const resetToken=crypto.randomBytes(32).toString('hex');
    this.passwordResetToken=crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    console.log(resetToken,this.passwordResetToken)
    this.passwordResetExpires= Date.now()+10*60*1000;

    return resetToken;
}
const User=mongoose.model('User', userSchema);
module.exports=User;
