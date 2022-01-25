const express = require("express");
const mongoose = require("mongoose");
const review = require("./models/review");

const path = require("path");

const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const joi = require("joi");

const app = express();

app.engine("ejs", ejsmate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const { Campgroundschema,reviewschema } = require("./schemas.js"); //this schema is for servers side joi validations

const validatecampground = (req, res, next) => {         //    it will validate every async function  of campgroundschema
  const { error } = Campgroundschema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new expresserror(msg, 400);
  } else {
    next();
  }
};

const validatereview = (req, res, next) => {         //    it will validate every async function of reviewschema
  const { error } = reviewschema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new expresserror(msg, 400);
  } else {
    next();
  }
};

const campground = require("./models/campground");

const catchasync = require("./utilities/catchasync");
const expresserror = require("./utilities/expresserror");

const db = mongoose.connect(
  "mongodb+srv://rishabh:yelpcamp@cluster0.pn1oe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

db.then(() => {
  console.log(" database connected");
});

app.get("/", (req, res) => {                   //homepage
  res.render("home");
});

app.put(                                   //update
  "/campgrounds/:id",
  validatecampground,
  catchasync(async (req, res) => {
    const { id } = req.params;

    const newcampground = await campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });

    res.redirect(`/campgrounds/${newcampground._id}`);
  })
);


 //delete campgrounds
app.delete("/campgrounds/:id",catchasync(async (req, res) => {
    const { id } = req.params;
    const p = await campground.findByIdAndDelete(id);

    res.redirect("/campgrounds");
  })
);
                                                   //adding reviews

app.post("/campgrounds/:id/reviews", validatereview,catchasync(async (req, res) => {
    const { id } = req.params;
    const thatcamp = await campground.findById(id);

    const Review = new review(req.body.review);

    thatcamp.reviews.push(Review);
    await Review.save();

    await thatcamp.save();
  
  
    res.redirect(`/campgrounds/${thatcamp._id}`);
  })
);
                                               //deleting reviews

  app.delete("/campgrounds/:id/reviews/:reviewid",catchasync(async(req,res)=>{
  const {id,reviewid}=req.params;
  await campground.findByIdAndUpdate(id, {$pull: {reviews:reviewid}});
  await review.findByIdAndDelete(req.params.reviewid);
  res.redirect(`/campgrounds/${id}`)
    
  }))

                                                //it will show home page

app.get("/campgrounds",catchasync(async (req, res) => {
    const campgrounds = await campground.find({});

    res.render("campgrounds/index", { campgrounds });
  })
);

app.get("/campgrounds/new", (req, res) => {                           ////it will show new page
  res.render("campgrounds/new");
});
                                                            //it will show a particular camp 

app.get("/campgrounds/:id",catchasync(async (req, res) => {
    const { id } = req.params;

    const foundcampground = await campground.findById(id).populate('reviews');
  
    res.render("campgrounds/show", { campground: foundcampground });
  })
);
                                                                              //it will show edit page
app.get("/campgrounds/:id/edit",
  catchasync(async (req, res) => {
    const { id } = req.params;

    const foundcampground = await campground.findById(id);

    res.render("campgrounds/edit", { campground: foundcampground });
  })
);
                              //it will make a new camp 
app.post("/campgrounds",validatecampground,catchasync(async (req, res) => {
    //if(!req.campground) throw new expresserror('invalid campground data',400);

    const newcampground = new campground(req.body.campground);
    await newcampground.save();

    res.redirect(`/campgrounds/${newcampground._id}`);
  })
);
//middleware of mongoose




app.all("*", (req, res, next) => {                                              //a middleware
  next(new expresserror("page not found", 404));
});

  app.use((err, req, res, next) => {                                             //it will catch the errors
  const { statuscode = 500 } = err;

  if (!err.message) err.message = "Oh no!! Something went wrong";

  res.status(statuscode).render("errors", { err });
});

app.listen(3000, () => {
  console.log("serving on port 3000  ");
});
