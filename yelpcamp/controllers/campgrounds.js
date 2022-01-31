const campground = require("../models/campground");

module.exports.index=async (req, res) => {
    const campgrounds = await campground.find({});

    res.render("campgrounds/index", { campgrounds });
  }

  module.exports.updatecamp=async (req, res) => {
      
    const { id } = req.params;
              const thiscampground= await campground.findById(id);
  
  
            
        const newcampground = await campground.findByIdAndUpdate(id, {...req.body.campground,});
        req.flash('success','Succesfully updated  Camground');
        res.redirect(`/campgrounds/${newcampground._id}`);
      
    
  
  };

  module.exports.deletecamp=async (req, res) => {
    const { id } = req.params;
    const thiscampground= await campground.findById(id);


      
    const p = await campground.findByIdAndDelete(id);
    req.flash('success','Succesfully deleted Camground');
    res.redirect("/campgrounds");
       
 }

 module.exports.showcamp=async (req, res) => {
    const { id } = req.params;

    const foundcampground = await campground.findById(id).populate({
      path:'reviews',
      populate:{

        path:'author'
      }
    }).populate('author');
      
    if(!foundcampground)
    {
      req.flash('error','Cannot find that campground')
      res.redirect('/campgrounds');
    }
  
    res.render("campgrounds/show", { campground: foundcampground });
  }

  module.exports.rendereditform=async (req, res) => {
    const { id } = req.params;
    const thiscampground= await campground.findById(id);
     
    const foundcampground = await campground.findById(id);
    if(!foundcampground)
    {
      req.flash('error','Cannot find that campground')
      res.redirect('/campgrounds');
    }
    else{
    res.render("campgrounds/edit", { campground: foundcampground });
    }
  }

  module.exports.newcamp=async (req, res) => {
    //if(!req.campground) throw new expresserror('invalid campground data',400);

   

    const newcampground = new campground(req.body.campground);
    newcampground.author=req.user._id;
    //console.log()
    
    await newcampground.save();
    
    req.flash('success','Succesfully made a new Camground');

    res.redirect(`/campgrounds/${newcampground._id}`);
  }

  module.exports.rendernewform=(req, res) => {  
    
    res.render("campgrounds/new");
  }
