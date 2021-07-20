const { forEach } = require('../admin/admins');
const ifAdmin = require('../middleware/ifadmin');
const returnUser=require('../middleware/user');
const Question=require('../models/question_user');
const Topic=require('../models/topic_user');

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

  console.log(req.params);
  var a=[];
  const id=req.params.id;
    Topic.find()
    .then(result=>{
      result.forEach(r=>{
        if(r.user==id)
        {
          a.push(r);
        }
      })
        res.render('practice_user',{topics: a});
    })
    .catch(err=>{
          console.log(err);
    });
}

module.exports.questions=(req,res)=>{
    const topic=req.params.topic;
    const id=req.params.id;
    var a=[];
    Question.find()
    .populate('topic')
    .exec(function (err, topics) {
        if (err) return handleError(err);
        else{
          topics.forEach(element => {
            if(element.topic.topic===topic && element.user==id)
            {
              a.push(element);
            }
          });
        }
        res.render('question_user',{title:topic, questions:a})
    });
}

module.exports.add_question_get=async(req,res)=>{
    var a=[];
    const user=await returnUser(req);
    Topic.find()
      .then(result=>{
        result.forEach(r=>{
        if(String(r.user)==String(user._id))
        {
            a.push(r);
        }
        })
        console.log(a);
          res.render('add_question_user',{topics: a});
      })
      .catch(err=>{
            console.log(err);
      });
}


module.exports.add_question_post=async(req,res)=>{
  const {question,topic,newTopic,link}=req.body;
  const user=await returnUser(req);
  const id=user._id;
    try{
      var ques;
      {
        if(topic!="1"){
          ques= new Question({question:question,link:link,topic:topic,user:id});
          const resp=await ques.save();
        }
        else{
          const t=await Topic.create({topic:newTopic,user:id});
          ques= new Question({question:question,link:link,topic:String(t._id),user:id});
          const resp=await ques.save();
        }
      }
      res.status(201).json({ques:ques._id});
    }
    catch(err){
      const errors=errorHandler(err);
      
      console.log(err);
      res.status(400).json({errors});
    }
     
}