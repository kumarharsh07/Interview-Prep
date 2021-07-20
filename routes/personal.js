const {Router}=require('express');
const router=Router();
const personalController=require('../controllers/personal_controller');
const {requireAuth}=require('../middleware/authMiddleware');

router.get('/myQuestions/:id',requireAuth,personalController.practice);
router.get('/myQuestions/:topic/:id',requireAuth,personalController.questions);
router.get('/addMyQuestion', requireAuth,personalController.add_question_get);
router.post('/addMyQuestion',personalController.add_question_post);
  
module.exports=router;
