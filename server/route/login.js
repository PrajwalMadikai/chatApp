let express=require('express');
let router=express.Router();
let loginController=require('../controller/loginController')


router.get('/',loginController.loginGet)
router.post('/',loginController.loginPost)

router.get('/signup',loginController.signUp)
router.post('/signup',loginController.signupPost)

router.get('/chat',loginController.home)






module.exports=router;