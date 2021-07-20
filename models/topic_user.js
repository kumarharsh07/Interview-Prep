const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const topicUserSchema= new mongoose.Schema({
    topic:{
        type: String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
    }
    
}); 


const Topic= mongoose.model('topic_user',topicUserSchema);
module.exports=Topic;
