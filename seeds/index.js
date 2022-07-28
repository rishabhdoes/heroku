const mongoose = require('mongoose');

const campground=require('../models/campground');
const cities=require('./cities.js');
const {places,feel}=require('./seedHelpers');
const db=mongoose.connect('mongodb+srv://rishabh:yelpcamp@cluster0.pn1oe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

db.then(()=>{
    console.log(" database connected");
});


const seedDB=async () =>{
    await campground.deleteMany({});
  
    for(let i=0;i<50;i++)
    {
        const r=Math.floor(Math.random()*1000);
        
        const  c = new campground({
        location:`${cities[r].city} ,${cities[r].state}`,

        title:` ${feel[Math.floor(Math.random() * feel.length)]}  ${places[Math.floor(Math.random() * places.length)]}`,

        images: [
            {
              url: 'https://res.cloudinary.com/dd1l9ov9j/image/upload/v1643809673/yelpcamp/bjwd1pshlmnmvusbxaol.jpg',
              filename: 'yelpcamp/bjwd1pshlmnmvusbxaol'
              
            },
            {
              url: 'https://res.cloudinary.com/dd1l9ov9j/image/upload/v1644776817/yelpcamp/aivdijhucfrbkracjovj.jpg',
              filename: 'yelpcamp/aivdijhucfrbkracjovj'
              
            }
          ],
        author:'61f686313b552e5dfc965979',
        geometry:{
          type: 'Point',
          coordinates: 
          [cities[r].longitude,
           cities[r].latitude,
          ] 
        },
        
        description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, rishabh libero alia deserunt doloressimilique qui Voluptatibus consequatur in, molestiae omnis assumenda fuga, maxime saepe ut explicabo perferendis numquam veritatis doloribus!",
         
        price:Math.floor(Math.random()*50)
        
    });
    await c.save();

    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})