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

        image:'https://source.unsplash.com/collection/8651603',
        
        description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, libero alia deserunt doloressimilique qui Voluptatibus consequatur in, molestiae omnis assumenda fuga, maxime saepe ut explicabo perferendis numquam veritatis doloribus!",
         
        price:Math.floor(Math.random()*50)
        
    });
    await c.save();

    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})