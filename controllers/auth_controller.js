const User = require("../models/user");
const jwt=require('jsonwebtoken');

//error Handler
emailerrorHandler=(err)=>{
    console.log(err.message,err.code);
    let errors={email:'',password:''};

    //incorrect email
    if(err.message.includes('incorrect email')){
        errors.email=err.message;
    }
    //incorrect password
    if(err.message.includes('incorrect password')){
        errors.password=err.message;
    }


    //duplicate error code
    if(err.code===11000)
    {
        errors.email='email already exists';
        return errors;
    }

    //validation error
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message;
        })
    }
    return errors;
}
//json web token
const maxAge=3*24*60*60;
const createToken=(id)=>{
    return jwt.sign({id},'do not even try',{
        expiresIn:maxAge
    });
}

module.exports.signup_get=(req,res)=>{
    res.render('signup');
}

module.exports.login_get=(req,res)=>{
    res.render('login');
}

module.exports.signup_post=async (req,res)=>{
    const {fname,sname,email,password}=req.body;

    try{
        const user = await User.create({fname,sname,email,password});
        const token=createToken(user._id);
        res.cookie('jwt',token,{ httpOnly:true, maxAge: maxAge*1000});
        res.status(201).json({user:user._id});
    }
    catch(err){
        console.log(err);
        const errors=emailerrorHandler(err);
        console.log(errors);
        res.status(400).json({errors});
    }
}

module.exports.login_post=async (req,res)=>{
    const {email,password}=req.body;

    try{
        const user = await User.login(email,password);
        const token=createToken(user._id);
        res.cookie('jwt',token,{ httpOnly:true, maxAge: maxAge*1000});
        res.status(200).json({user:user._id});
    }
    catch(err){
        console.log(err);
        const errors=emailerrorHandler(err);
        console.log(errors);
        res.status(400).json({errors});
    }
}

module.exports.logout_get=(req,res)=>{
    res.cookie('jwt','', {maxAge:1});
    res.redirect('/');
}