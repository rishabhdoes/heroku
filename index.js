if(process.env.NODE_ENV !=='production')
{
  require('dotenv').config();
}

//console.log(process.env.secret)

const express = require("express");
const mongoose = require("mongoose");
  
const catchasync = require("./utilities/catchasync");
const expresserror = require("./utilities/expresserror");

const session=require('express-session');
const path = require("path");

const methodOverride = require("method-override");                                  
const ejsmate = require("ejs-mate");
const joi = require("joi");

const flash=require('connect-flash');

const app = express();




const { cardschema } = require("./schemas.js"); //this schema is for servers side joi validations

const card = require("./models/card");


 const cardrouter =require('./routes/card')
const userrouter =require('./routes/users')


const passport=require('passport');
const localstrategy=require('passport-local');
const User=require('./models/user');

const db = mongoose.connect(
  "mongodb+srv://op:op@cluster0.hhigoat.mongodb.net/campstore"
);


db.then(() => {
  console.log(" database connected");
});


app.engine("ejs", ejsmate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

const sessionconfig={
  secret:'This should be a Secret',
  resave:false,
  saveUninitialized:true,
  cookie:{
    httpOnly:true,
    expires: Date.now()  + 1000*60*60*24*7,
    maxAge:1000*60*60*24*7
  }
}

app.use(session(sessionconfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//by this we are making the key values local to every route i.e success ,error ,currentuser
app.use((req,res,next)=>{
  //console.log(req.session);
res.locals.returnto=req.user;
res.locals.currentuser=req.user;
//console.log(req.user);
res.locals.success=req.flash('success');
res.locals.error=req.flash('error');
next();
//console.log(req.session.returnto)
})





//forwding to their respective routes
app.use('/',userrouter);
app.use('/cards',cardrouter);

app.get("/", (req, res) => {                   //homepage
  res.render("home");
});


app.use(express.static('public'));
app.set(express.static(path.join(__dirname, "public")));









//middleware of mongoose




app.all("*", (req, res, next) => {                                              //a middleware
  next(new expresserror("page not found", 404));
});

  app.use((err, req, res, next) => {                                             //it will catch the errors
  const { statuscode = 500 } = err;

  if (!err.message) err.message = "Oh no!! Something went wrong";

  res.status(statuscode).render("errors", { err });
});

const port=process.env.PORT||3000
app.listen(port, () => {
  console.log("serving on port   ",port);
});

