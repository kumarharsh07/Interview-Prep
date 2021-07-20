
const User = require('../models/user');
const jwt=require('jsonwebtoken');
const { use } = require('../routes/practice');
const admins=require('../admin/admins')

const adminCheck=(req,res,next)=>{
    const token=req.cookies.jwt;

    //check jwt exists and verified
    if(token){
        jwt.verify(token,'do not even try',(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }
            else
            {
                var ctr=0;
                
                User.findById(decodedToken.id)
                .then((result)=>{
                    
                    for(var i=0;i<admins.length;i++)
                    {
                        console.log(result.email);
                        if(admins[i]==result.email)
                        {
                            ctr=1;
                            break;
                        }
                    }
                    if(ctr===1){
                        
                        next();
                    }
                    else
                    {
                        res.redirect('/AccessDenied');
        
                    }
                }).catch((err)=>{
                    console.log(err);
                })

            }
        });
    }
    else{
        res.redirect('/login');
    }

}

module.exports=adminCheck;