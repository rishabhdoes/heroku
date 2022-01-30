const express =require ('express');
const mongoose = require("mongoose");
const router =express.Router({mergeParams:true});
const catchasync = require("../utilities/catchasync");
const expresserror = require("../utilities/expresserror");
const user=require('../models/user');
const passport = require('passport');



router.get('/register',(req,res)=>{
    res.render('users/register')
})

router.post('/register',catchasync(async(req,res,next)=>{
    try{
   const{email,username,password}=req.body;

   const thisuser=new user({email,username});//checks if username is available or  not and if not then makes the username

   const registereduser=await user.register(thisuser,password)//it takes useranme and password and  salts after hashing store them in db
       req.login(registereduser,err=>{
           if(err) return next(err);
       })
  // console.log(registereduser);

   req.flash('success',"welcome to Yelpcamp");
   res.redirect('/campgrounds')
    }

    catch(e)
    {
        req.flash('error',e.message)
        res.redirect('/register')
    }

    
}))

router.get('/login',(req,res)=>{
    res.render('users/login')
})

router.post('/login',passport.authenticate('local',{failureFlash:true ,failureRedirect:'/login'}) ,(req,res)=>{
   
    req.flash('success','Welcome back');
    
    const redirect_to=(req.session.returnto || '/campgrounds')

    delete req.session.returnto;


res.redirect(redirect_to);

    
})

router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success','bye bye');
    res.redirect('/campgrounds');
})


module.exports=router;