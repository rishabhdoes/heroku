const express =require('express');
const mongoose = require('mongoose');


const path =require('path');

const methodOverride= require('method-override');
  const ejsmate=require('ejs-mate');


  const app=express();

  app.engine('ejs',ejsmate);

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const campground=require('./models/campground');

const db=mongoose.connect('mongodb+srv://rishabh:yelpcamp@cluster0.pn1oe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

db.then(()=>{
    console.log(" database connected");
});

app.get('/',(req,res)=>{

    res.render('home');
  
})

app.put('/campgrounds/:id',async(req,res)=>{
  res.send("op");
})

app.delete('/campgrounds/:id',async(req,res)=>{
  const{id}=req.params;
  const p=await campground.findByIdAndDelete(id);

  res.redirect('/campgrounds');
})

app.get('/',(req,res)=>{

    res.render('home');
  
})


app.get('/campgrounds',async(req,res)=>{

   const campgrounds =await campground.find({});

   res.render('campgrounds/index',{campgrounds});
  
})

app.get('/campgrounds/new',(req,res)=>{

    res.render('campgrounds/new');
 })


app.get('/campgrounds/:id',async(req,res)=>{
  const {id}=req.params;

    const foundcampground =await campground.findById(id);
 
    res.render('campgrounds/show',{campground:foundcampground});
   
 })

 app.get('/campgrounds/:id/edit',async(req,res)=>{
    const {id}=req.params;
  
      const foundcampground =await campground.findById(id);
   
      res.render('campgrounds/edit',{campground:foundcampground});
     
   })

 app.post('/campgrounds',async (req,res)=>{
   const newcampground=new campground(req.body.campground);
   await newcampground.save();

   res.redirect(`/campgrounds/${newcampground._id}`);

 })




app.listen(3000,()=> {
    console.log('serving on port 3000');
})