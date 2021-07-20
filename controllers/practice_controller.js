const { forEach } = require('../admin/admins');
const ifAdmin = require('../middleware/ifadmin');
const Question=require('../models/question');
const Topic=require('../models/topic');

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

module.exports.practice=(req,res)=>{
  var a=[];
    Topic.find()
    .then(result=>{
      result.forEach(r=>{
        if(r.display===true)
        {
          a.push(r);
        }
      })
        res.render('practice',{topics: a});
    })
    .catch(err=>{
          console.log(err);
    });
}

module.exports.questions=(req,res)=>{
    const topic=req.params.topic;
    var a=[];
    Question.find()
    .populate('topic')
    .exec(function (err, topics) {
        if (err) return handleError(err);
        else{
          topics.forEach(element => {
            if(element.topic.topic===topic && element.display===true)
            {
              a.push(element);
            }
          });
        }
        res.render('questions',{title:topic, questions:a})
    });
}

module.exports.add_question_get=(req,res)=>{
  Topic.find()
  .then(result=>{
      res.render('add_question',{topics: result});
  })
  .catch(err=>{
        console.log(err);
  });
}


module.exports.add_question_post=async(req,res)=>{
  const {question,topic,newTopic,link}=req.body;
  ifAdmin(req).then(async(result)=>{
    try{
      var ques;
      if(result===true){
        if(topic!="1"){
          ques= new Question({question:question,link:link,topic:topic,display:true});
          const resp=await ques.save();
        }
        else{
          const t=await Topic.create({topic:newTopic,display:true});
          ques= new Question({question:question,link:link,topic:t._id,display:true});
          const resp=await ques.save();
        }
      }
      else{
        if(topic!="1"){
          ques= new Question({question:question,link:link,topic:topic,display:false});
          const resp=await ques.save();
        }
        else{
          const t=await Topic.create({topic:newTopic,display:false});
          ques= new Question({question:question,link:link,topic:t._id,display:false});
          const resp=await ques.save();
        }
      }
      res.status(201).json({ques:ques._id});
      
    }
    catch(err){
      const errors=errorHandler(err);
      console.log("hello");
      
      //console.log(err);
      res.status(400).json({errors});
    }
    
  }).catch(err=>{
    console.log(err);
  })  
}