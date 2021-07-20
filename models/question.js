const mongoose = require('mongoose');

const questionSchema= new mongoose.Schema({
    question:{
        type: String,
        required:true
    },
    link:{
        type: String,
        required:true,
        unique:true
    },
    topic:{
        type: mongoose.Schema.Types.ObjectId,
		ref: 'topic'
    },
    display:{
        type: Boolean,
        default:false

    }
    
}); 

const Question= mongoose.model('question',questionSchema);

module.exports=Question;
