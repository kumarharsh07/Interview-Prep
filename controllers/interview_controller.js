const { forEach } = require('../admin/admins');
const ifAdmin = require('../middleware/ifadmin');
const Company=require('../models/company');
const Experience=require('../models/experience');
const fs=require('fs');
const upload = require('../uploads_config/upload');
var path = require('path');




errorHandler=(err)=>{
  let errors={link:'',topic:''};
  
  if(err.code===11000)
    {
      er=err.keyValue;
      if(Object.keys(er).includes("link"))
        errors.link='link already exists in database';
      if(Object.keys(er).includes("topic"))
        errors.topic='topic already exists in database';
      
    }
  return errors;
}

module.exports.companies=(req,res)=>{
  var a=[];
    Company.find()
    .then(result=>{
      result.forEach(r=>{
        if(r.display===true)
        {
          a.push(r);
        }
      })
        res.render('interview',{companies: a});
    })
    .catch(err=>{
          console.log(err);
    });
}

module.exports.experiences=(req,res)=>{
    console.log("in");
    const company=req.params.company;
    var a=[];
    Experience.find()
    .populate('company')
    .exec(function (err, experiences) {
        if (err) return handleError(err);
        else{
          experiences.forEach(element => {
            if(element.company.company===company && element.display===true)
            {
              a.push(element);
            }
          });
        }
        res.render('experiences',{title:company, experiences:a})
    });
}

module.exports.exp=(req,res)=>{

  const company=req.params.company;
  const id=req.params.id;
  Experience.findById(id)
  .then(result=>{
    res.render('exp',{title:company,exp:result});
  }).catch(err=>{
    console.log(err);
  })
}


module.exports.add_experience_post=async(req,res)=>{

  const{name,company,profile,text,newCompany}=req.body;
  const img={
    data:fs.readFileSync(path.join('C:/Users/kumar/OneDrive/Desktop/node-express-jwt-auth/public/uploads/' + req.files['img'][0].filename)),
    contentType: 'image/png'
  }
  var cimg;
  if('cimg' in req.body){
    console.log("in");
    cimg=1;
  }
  else{
    cimg={
      data:fs.readFileSync(path.join('C:/Users/kumar/OneDrive/Desktop/node-express-jwt-auth/public/uploads/' + req.files['cimg'][0].filename)),
      contentType: 'image/png'
    }
  }
  
  //console.log(req);
  ifAdmin(req).then(async(result)=>{
    try{
      var experience;
      if(result===true){
        if(company!="1"){
            experience=await Experience.create({img:img,name:name,profile:profile,text:text,company:company,display:true});
        }
        else{
            if(cimg===1){
              const c=await Company.create({company:newCompany,display:true});
              experience=await Experience.create({img:img,name:name,profile:profile,text:text,company:c._id,display:true});
            }
            else{
            const c=await Company.create({img:cimg,company:newCompany,display:true});
            experience=await Experience.create({img:img,name:name,profile:profile,text:text,company:c._id,display:true});
            }
        }
      }
      else{
        if(company!="1"){
          experience=await Experience.create({img:img,name:name,profile:profile,text:text,company:company,display:false});
        }
        else{
            const c=await Company.create({img:cimg,company:newCompany,display:true});
            experience=await Experience.create({img:img,name:name,profile:profile,text:text,company:c._id,display:true});
        }
      }
      res.status(201).json({experience:experience._id});
      
    }
    catch(err){
      console.log('err begins here' );
      console.log(err);
      const errors=errorHandler(err);
      
      //console.log(err);
      res.status(400).json({errors});
    }
    
  }).catch(err=>{
    console.log(err);
  })  
}