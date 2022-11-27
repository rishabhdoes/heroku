const express =require ('express');
const mongoose = require("mongoose");
const router =express.Router({mergeParams:true});
const catchasync = require("../utilities/catchasync");
const expresserror = require("../utilities/expresserror");
const user=require('../models/user');
const passport = require('passport');
const isverified=require('../middleware')
const {renderregisterform,registeruser,renderloginform,logoutuser,loginuser,renderotpauthform,verifyotp}=require('../controllers/users')


router.get('/register',renderregisterform)

router.post('/register',catchasync(registeruser))

router.get('/login',renderloginform)

router.post('/login',passport.authenticate('local',{failureFlash:true ,failureRedirect:'/login'}) ,loginuser,(req,res)=>{
   req.session.returnto='/cards';
})

router.get('/logout',logoutuser)

router.get('/verification',renderotpauthform)
router.post('/verification',verifyotp)




module.exports=router;