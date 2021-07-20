const jwt=require('jsonwebtoken');
const User = require('../models/user');

const returnUser=(req)=>{
    return new Promise(function (resolve,reject){
        const token=req.cookies.jwt;
        if(token){
            jwt.verify(token,'do not even try',async (err,decodedToken)=>{
                if(err){
                    console.log(err.message);
                    reject(err);
                }
                else{
                    console.log(decodedToken);
                    let user=await User.findById(decodedToken.id);
                    resolve(user);
                }
            });
        }
        else
        {
            let user=null;
            resolve(user);
        }
    });
}
module.exports=returnUser;