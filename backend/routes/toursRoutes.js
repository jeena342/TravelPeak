const express=require("express")
const toursController=require("./../controllers/tourcontrollers")
const authController=require('./../controllers/authController')
const reviewRouter = require('./../routes/reviewRoutes');

const router=express.Router();

router.use('/:tourId/reviews', reviewRouter);

router.route('/monthly-plan/:year').get(authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),toursController.getMonthlyPlan)
router.route('/tour-stats').get(toursController.getTourStats)
router.route('/top-5-cheap').get(toursController.aliasTopTours,toursController.getAllTours)
router.route('/')
            .get(authController.protect,toursController.getAllTours).post(toursController.createTour);
router.route('/:id')
            .get(toursController.getTour).patch(toursController.updateTour).delete(authController.protect,authController.restrictTo('lead-guide','admin'),toursController.deleteTour)

module.exports=router;