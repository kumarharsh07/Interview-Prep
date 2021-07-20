const {Router}=require('express');
const router=Router();
const interviewController=require('../controllers/interview_controller');
const {requireAuth}=require('../middleware/authMiddleware');
const upload =require("../uploads_config/upload")

router.get('/interviewExperiences',requireAuth,interviewController.companies);
router.get('/interviewExperiences/:company',requireAuth,interviewController.experiences);
router.post('/addExperience',interviewController.add_experience_post);
router.get('/interviewExperiences/:company/:id', requireAuth,interviewController.exp);

module.exports=router;
