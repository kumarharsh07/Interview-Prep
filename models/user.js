const mongoose = require('mongoose');
const {isEmail}=require('validator');
const bcrypt=require('bcrypt');

const userSchema= new mongoose.Schema({
    fname:{
        type: String,
        required:true
    },
    sname:{
        type: String,
        required:true
    },
    email :{
        type: String,
        required:[true,'Please enter an email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Not a valid email id']
    },
    password:{
        type: String,
        required:[true,'Please enter a password'],
        minlength :[6,'Minimmum length of the password should be six']
    }

}); 
//hashing password
userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();

})
//static method to login user
userSchema.statics.login=async function(email,password){
    const user= await this.findOne({email:email});
    if(user){
        const auth=await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect password');
        
    }
    throw Error('incorrect email');

}

const User= mongoose.model('user',userSchema);
module.exports=User;





