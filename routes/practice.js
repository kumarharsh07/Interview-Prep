const {Router}=require('express');
const router=Router();
const practiceController=require('../controllers/practice_controller');
const {requireAuth}=require('../middleware/authMiddleware');

router.get('/practice',requireAuth,practiceController.practice);
router.get('/practice/:topic',requireAuth,practiceController.questions);
router.get('/addQuestion', requireAuth,practiceController.add_question_get);
router.post('/addQuestion',practiceController.add_question_post);
  
module.exports=router;
