const express=require("express")
const authController=require('./../controllers/authController')
const userController=require('./../controllers/userController')
const router=express.Router();
//router.post('/signup',authController.signup)
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgetPassword',authController.forgetPassword);
//router.patch('/resetPassword/:token',authController.resetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);
router.get('/me', userController.getMe, userController.getUser);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;