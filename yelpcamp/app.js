const express = require("express");
const mongoose = require("mongoose");


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

const { Campgroundschema } = require("./schemas.js"); //this schema is for servers side joi validations
const review = require("./models/review");
const validatecampground = (req, res, next) => {
  const { error } = Campgroundschema.validate(req.body);
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

app.get("/", (req, res) => {
  res.render("home");
});

app.put(
  "/campgrounds/:id",
  validatecampground,
  catchasync(async (req, res) => {
    const { id } = req.params;

    const newcampground = await campground.findByIdAndUpdate(id, {  ...req.body.campground,});

    res.redirect(`/campgrounds/${newcampground._id}`);
  })
);

app.get("/", (req, res) => {
  res.render("home");
});

app.delete(
  "/campgrounds/:id",
  catchasync(async (req, res) => {
    const { id } = req.params;
    const p = await campground.findByIdAndDelete(id);

    res.redirect("/campgrounds");
  })
);

app.post(
  "/campgrounds/:id/reviews",
  catchasync(async (req, res) => {
    const { id } = req.params;
    const p = await campground.findById(id);

    res.send("OKAY");
  })
);

app.get(
  "/campgrounds",
  catchasync(async (req, res) => {
    const campgrounds = await campground.find({});

    res.render("campgrounds/index", { campgrounds });
  })
);

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

app.get(
  "/campgrounds/:id",
  catchasync(async (req, res) => {
    const { id } = req.params;

    const foundcampground = await campground.findById(id);

    res.render("campgrounds/show", { campground: foundcampground });
  })
);

app.get(
  "/campgrounds/:id/edit",
  catchasync(async (req, res) => {
    const { id } = req.params;

    const foundcampground = await campground.findById(id);

    res.render("campgrounds/edit", { campground: foundcampground });
  })
);

app.post(
  "/campgrounds",
  validatecampground,
  catchasync(async (req, res) => {
    //if(!req.campground) throw new expresserror('invalid campground data',400);

    const newcampground = new campground(req.body.campground);
    await newcampground.save();

    res.redirect(`/campgrounds/${newcampground._id}`);
  })
);

app.all("*", (req, res, next) => {
  next(new expresserror("page not found", 404));
});

app.use((err, req, res, next) => {
  const { statuscode = 500 } = err;

  if (!err.message) err.message = "Oh no!! Something went wrong";

  res.status(statuscode).render("errors", { err });
});

app.listen(3000, () => {
  console.log("serving on port 3000  ");
});
