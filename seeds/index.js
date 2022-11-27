const mongoose = require('mongoose');

const card=require('../models/card');
const cities=require('./cities.js');
const {places,feel,photos}=require('./seedHelpers');
const db=mongoose.connect('mongodb+srv://rishabh:yelpcamp@cluster0.pn1oe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

db.then(()=>{
    console.log(" database connected");
});


const seedDB=async () =>{
    await card.deleteMany({});
  
    for(let i=0;i<20 ;i++)
    {
        const r=Math.floor(Math.random()*1000);
        
        const  c = new card({
        location:`${cities[r].city} ,${cities[r].state}`,

        title:` ${feel[Math.floor(Math.random() * feel.length)]}  ${places[Math.floor(Math.random() * places.length)]} Camp`,

        images: [
            {
              url: 'https://res.cloudinary.com/dd1l9ov9j/image/upload/v1659208180/yelpcamp/wpdoultaphfuwx4v2fwb.jpg',
              filename: 'yelpcamp/wpdoultaphfuwx4v2fwb'
              
            },
            {
              url: 'https://res.cloudinary.com/dd1l9ov9j/image/upload/v1659210105/yelpcamp/nnhqfazyj6yaid6wg1ep.jpg',
              filename: 'yelpcamp/nnhqfazyj6yaid6wg1ep'
              
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
        reviews:[
          '61f81d66f3e84193bfdd392c',
          '6200fc0aa1e9f47e3f84504f'
        ],
        
        description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, rishabh libero alia deserunt doloressimilique qui Voluptatibus consequatur in, molestiae omnis assumenda fuga, maxime saepe ut explicabo perferendis numquam veritatis doloribus!",
         
        price:Math.floor(Math.random()*50)
     
        

        
    });
    await c.save();

    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})