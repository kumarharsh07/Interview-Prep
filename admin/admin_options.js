const AdminBro=require('admin-bro');
const Company = require('../models/company');
const Experience = require('../models/experience');
const Question=require('../models/question');
const Topic=require('../models/topic');


/** @type{AdminBro.AdminBroOptions}**/

const options={
    resources : [Topic,Question,Experience,Company]
};


module.exports=options;