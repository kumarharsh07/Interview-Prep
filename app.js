const express = require('express');
const mongoose = require('mongoose');
const authRoutes=require('./routes/authentication');
const practiceRoutes=require('./routes/practice');
const personalRoutes=require('./routes/personal');
const interviewRoutes=require('./routes/interview');
const cookieParser=require('cookie-parser');
const { requireAuth ,checkUser} = require('./middleware/authMiddleware');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const options=require('./admin/admin_options');
const buildAdminRouter=require('./admin/admin_router');
const adminCheck = require('./middleware/adminCheck');
const bodyParser = require('body-parser');
var upload=require('./uploads_config/upload');

AdminBro.registerAdapter(AdminBroMongoose);

const app = express();
global.user=undefined;

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.json());
app.use(cookieParser());
app.use(upload);


// view engine
app.set('view engine', 'ejs');

// database connection
const run=async()=>{
  
  const dbURI = 'mongodb+srv://customer:1234@cluster0.rukvc.mongodb.net/auth';
  const mongooseDb= await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
    .then((result) =>{

      console.log('connected to database');
      app.listen(3000);

      const admin = new AdminBro(options);
      const router=buildAdminRouter(admin);
      app.use(adminCheck);
      app.use(admin.options.rootPath, router);

    })
    .catch((err) => console.log(err));
};

run();



// routes

app.get('*',checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/AccessDenied',(req,res)=>res.render('access_denied'));
app.use(practiceRoutes);
app.use(personalRoutes);
app.use(interviewRoutes);
app.use(authRoutes);

//cookies
