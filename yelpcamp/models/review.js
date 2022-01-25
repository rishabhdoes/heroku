
const { number } = require('joi');
const mongoose=require('monngoose');

const Schema =mongoose.Schema;

const reviewSchema =new Schema({
    body:String,
    rating :Number
});

module.exports=mongoose.model("review",reviewSchema);

