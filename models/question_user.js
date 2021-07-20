const mongoose = require('mongoose');

const questionUserSchema= new mongoose.Schema({
    question:{
        type: String,
        required:true
    },
    link:{
        type: String,
        required:true
    },
    topic:{
        type: mongoose.Schema.Types.ObjectId,
		ref: 'topic_user'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
    }
   
    
}); 

const Question= mongoose.model('question_user',questionUserSchema);

module.exports=Question;
