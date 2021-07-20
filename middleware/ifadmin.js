
const User = require('../models/user');
const jwt=require('jsonwebtoken');
const { use } = require('../routes/practice');
const admins=require('../admin/admins')

const ifAdmin=(req)=>{
    return new Promise(function (resolve,reject){
        const token=req.cookies.jwt;

        //check jwt exists and verified
        if(token){
            jwt.verify(token,'do not even try',(err,decodedToken)=>{
                if(err){
                    reject(err);
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
                            resolve(true);
                        }
                        else
                        {
                            resolve(false);
            
                        }
                    }).catch((err)=>{
                        reject(err);
                    })

                }
            });
        }
        else{
            resolve(false);
        }

    });
}

module.exports=ifAdmin;