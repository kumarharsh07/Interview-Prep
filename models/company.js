const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const companySchema= new mongoose.Schema({
    img:
    {
        data: Buffer,
        contentType: String
    },
    company:{
        type: String,
        required:true,
        unique:true
    },
    display:{
        type: Boolean,
        default:false

    }
    
}); 


const Company= mongoose.model('company',companySchema);
module.exports=Company;
