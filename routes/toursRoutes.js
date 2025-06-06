const express=require("express")
const toursController=require("./../controllers/tourcontrollers")
const authController=require('./../controllers/authController')

const router=express.Router();
router.route('/monthly-plan/:year').get(toursController.getMonthlyPlan)
router.route('/tour-stats').get(toursController.getTourStats)
router.route('/top-5-cheap').get(toursController.aliasTopTours,toursController.getalltours)
router.route('/')
            .get(authController.protect,toursController.getalltours).post(toursController.createTour);
router.route('/:id')
            .get(toursController.gettours).patch(toursController.updateTour).delete(authController.protect,authController.restrictTo('lead-guide','admin'),toursController.deleteTour)

module.exports=router;