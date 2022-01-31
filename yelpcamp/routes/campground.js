const express =require ('express');
const mongoose = require("mongoose");
const router =express.Router();
const catchasync = require("../utilities/catchasync");
const expresserror = require("../utilities/expresserror");
const campground = require("../models/campground");
const review = require("../models/review");
const joi = require("joi");
const { Campgroundschema,reviewschema } = require("../schemas.js"); //this schema is for servers side joi validations
const {isloggedin,isAuthor,validatecampground}=require('../middleware')

const passport = require('passport');


  


                                                                       //update

router.put("/:id",isloggedin,validatecampground,isAuthor,catchasync(async (req, res) => {
      
  const { id } = req.params;
            const thiscampground= await campground.findById(id);


          
      const newcampground = await campground.findByIdAndUpdate(id, {...req.body.campground,});
      req.flash('success','Succesfully updated  Camground');
      res.redirect(`/campgrounds/${newcampground._id}`);
    
  

}));
  
  
                                                       //delete campgrounds

  router.delete("/:id",isloggedin,isAuthor,catchasync(async (req, res) => {
      const { id } = req.params;
      const thiscampground= await campground.findById(id);


        
      const p = await campground.findByIdAndDelete(id);
      req.flash('success','Succesfully deleted Camground');
      res.redirect("/campgrounds");
         

         
    })
  );
  
  
                                                  //it will show home page
  
  router.get("/",catchasync(async (req, res) => {
      const campgrounds = await campground.find({});
  
      res.render("campgrounds/index", { campgrounds });
    })
  );
                                                                               ////it will show new page
  router.get("/new" ,isloggedin,(req, res) => {  
    
    res.render("campgrounds/new");
  });
                                                              //it will show a particular camp 
  
  router.get("/:id",catchasync(async (req, res) => {
      const { id } = req.params;
  
      const foundcampground = await campground.findById(id).populate({
        path:'reviews',
        populate:{

          path:'author'
        }
      }).populate('author');
        
      if(!foundcampground)
      {
        req.flash('error','Cannot find that campground')
        res.redirect('/campgrounds');
      }
    
      res.render("campgrounds/show", { campground: foundcampground });
    })
  );
                                                                                //it will show edit page
  router.get("/:id/edit",isloggedin,isAuthor,catchasync(async (req, res) => {
      const { id } = req.params;
      const thiscampground= await campground.findById(id);
      
      

      
       
      const foundcampground = await campground.findById(id);
      if(!foundcampground)
      {
        req.flash('error','Cannot find that campground')
        res.redirect('/campgrounds');
      }
      else{
      res.render("campgrounds/edit", { campground: foundcampground });
      }
    }


  ));
  
  
                                                                       //it will make a new camp 
  router.post("/",validatecampground,isloggedin,catchasync(async (req, res) => {
      //if(!req.campground) throw new expresserror('invalid campground data',400);

     

      const newcampground = new campground(req.body.campground);
      newcampground.author=req.user._id;
      //console.log()
      
      await newcampground.save();
      
      req.flash('success','Succesfully made a new Camground');

      res.redirect(`/campgrounds/${newcampground._id}`);
    })
  );

  module.exports=router;