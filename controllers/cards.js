const card = require("../models/card");
const expresserror = require("../utilities/expresserror");

const axios=require('axios');
const User = require("../models/user");
const token=process.env.mapboxtoken

module.exports.index = async (req, res) => {

  const cards = await card.find({});

  res.render("cards/index", { cards });
};

module.exports.newcamp = async (req, res) => {
  console.log("opopopopopop");

  //if(!req.body.card) throw new expresserror('invalid card data',400);

  //console.log(req.body.card);
const newcard = new card(req.body.card);
    
  newcard.author = req.user.name;

  await newcard.save();
 console.log(newcard);
  
  req.flash("success", "Succesfully listed ur card");

  res.redirect(`/cards/${newcard._id}`);
};

  module.exports.updatecamp = async (req, res) => {
  
  const { id } = req.params;

  const thiscard = await card.findByIdAndUpdate(id,{ ...req.body.card});


 // console.log(req.body.deleteImages)

 await thiscard.save();

   
  req.flash("success", "Succesfully updated  Camp");
  res.redirect(`/cards/${thiscard._id}`);

};

module.exports.deletecamp = async (req, res) => {
  const { id } = req.params;
  const thiscard = await card.findById(id);

  const p = await card.findByIdAndDelete(id);
  req.flash("success", "Succesfully deleted Camground");
  res.redirect("/cards");
};

module.exports.showcamp = async (req, res) => {
  const { id } = req.params;

  const foundcard = await card
    .findById(id)
    

  if (!foundcard) {
    req.flash("error", "Cannot find that czard");
    res.redirect("/cards");
  }
  
  const authordetail=await User.findOne({name:foundcard.author});
  res.locals.authordetail=authordetail;
 

  //console.log(foundcard)
  res.render("cards/show", { card: foundcard });
};

module.exports.rendereditform = async (req, res) => {
  const { id } = req.params;
  const thiscard = await card.findById(id);

  const foundcard = await card.findById(id);
  if (!foundcard) {
    req.flash("error", "Cannot find that card");
    res.redirect("/cards");
  } else {
    res.render("cards/edit", { card: foundcard });
  }
};



module.exports.rendernewform = (req, res) => {
  res.render("cards/new");
};
