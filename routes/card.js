const express =require ('express');
const mongoose = require("mongoose");
const router =express.Router();
const catchasync = require("../utilities/catchasync");
const expresserror = require("../utilities/expresserror");
const card = require("../models/card");

const joi = require("joi");
const { cardschema,reviewschema } = require("../schemas.js"); //this schema is for servers side joi validations
const {isloggedin,isAuthor,validatecard}=require('../middleware')
const{index,updatecamp,deletecamp,showcamp,rendereditform,rendernewform,newcamp}=require('../controllers/cards')
const passport = require('passport');

  //it will show home page
  
  router.get("/",catchasync(index));

//update

  router.put("/:id",isloggedin,isAuthor,catchasync(updatecamp));
  
  
 //delete cards

  router.get("/:id/delete",isloggedin,isAuthor,catchasync(deletecamp)
  );
  
  
   
   ////it will show new page
  router.get("/new" ,isloggedin,rendernewform);
                                                              //it will show a particular camp 
  
  router.get("/:id",catchasync(showcamp)
  );
                                                                                //it will show edit page
  router.get("/:id/edit",isloggedin,isAuthor,catchasync(rendereditform));
  
  
                                                                       //it will make a new camp 
  router.post("/",isloggedin,validatecard,catchasync(newcamp));


  
  module.exports=router;