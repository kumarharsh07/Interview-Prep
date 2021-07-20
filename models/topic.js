const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const topicSchema= new mongoose.Schema({
    topic:{
        type: String,
        required:true,
        unique:true
    },
    display:{
        type: Boolean,
        default:false

    }
    
}); 


const Topic= mongoose.model('topic',topicSchema);
module.exports=Topic;
