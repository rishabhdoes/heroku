const mongoose=require('mongoose');
const Schema =mongoose.Schema;
const review =require('./review');


const imageschema =new Schema({
    url:String,
        filename:String
})
imageschema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_200');
})
const CampgroundSchema =new Schema({
    title:String,
    images:[imageschema],
    price:Number,
    description:String,
    location:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'review'
        }
    ]
})
//mongoose middleware
CampgroundSchema.post('findOneAndDelete',async function(doc){
    if(doc){
        await review.deleteMany({
            _id:{
                $in:doc.reviews
            }
        })
    }
  })
module.exports= mongoose.model('campground',CampgroundSchema);