const mongoose=require('mongoose');
const Schema =mongoose.Schema;
// const review =require('./review');


// const imageschema =new Schema({
//     url:String,
//     filename:String
// })

// imageschema.virtual('thumbnail').get(function(){
//     return this.url.replace('/upload','/upload/w_200');
// })

// imageschema.virtual('dp').get(function(){
//     return this.url.replace('/upload','/upload/w_1100/h_500');
// })


// const opts ={toJSON: {virtuals :true}};

const cardSchema =new Schema({
    mess:{
        type:String,
        enum:['A','B','C']
    },
    price:{
        type:Number,
        default:30
    },
    description:String,
    hostel :String,
    author:String
   
    
});

//virtual components arenot stored in database they are just a modified version of data stored already in db used when it is called

// cardSchema.virtual('properties.popUpMarkup').get(function(){
//     return `  <a href="/cards/${this._id}">${this.title}</a> 
//       <p>${this.description.substring(0,40)}...</p>
//     `
// })



//mongoose middleware
// cardSchema.post('findOneAndDelete',async function(doc){
//     if(doc){
//         await review.deleteMany({
//             _id:{
//                 $in:doc.reviews
//             }
//         })
//     }
//   })
module.exports= mongoose.model('card',cardSchema);