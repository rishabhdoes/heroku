const mongoose=require('mongoose');

const passportLocalMongoose=require('passport-local-mongoose');
const Schema =mongoose.Schema;
const userschema=new Schema({
    username:{type: String, required: true, unique: true},
    name:{type: String, required: true},
  password: { type: String},
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true ,unique:true,minlength:10,maxlength:10},
  year:{type:String,required:true},
  hostel:{type:String,required:true},
  room_no:{type:String,required:true},
  verified:{type:Boolean,required:true,default:false}
});

userschema.plugin(passportLocalMongoose);
const User=new mongoose.model("User",userschema);




module.exports=User