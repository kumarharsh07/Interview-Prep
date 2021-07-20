const mongoose = require('mongoose');

const experienceSchema= new mongoose.Schema({
    img:
    {
        data: Buffer,
        contentType: String,
    },
    name:{
        type: String,
        required:true
    },
    profile:{
        type: String,
        required:true,
    },
    text:{
        type: String,
        required:true,
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
		ref: 'company'
    },
    display:{
        type: Boolean,
        default:false

    }
    
}); 

const Experience= mongoose.model('experience',experienceSchema);

module.exports=Experience;
