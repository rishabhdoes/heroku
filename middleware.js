const catchasync = require("./utilities/catchasync");
const expresserror = require("./utilities/expresserror");
const card = require("./models/card");
const user = require("./models/card");
const { cardschema } = require("./schemas.js"); //this schema is for servers side joi validations
const User = require("./models/user");


//this middleware is used for login /logout and register authentication

module.exports.isloggedin=(req,res,next)=>{  
                     //it checks if we are logged in 
    req.session.returnto=req.originalUrl;

    if(!req.isAuthenticated())
    {  req.flash('error','you must be signed in');
             return res.redirect('/login')
    
    }

    next();
}

module.exports.isverified=async(req,res,next)=>{  
  //it checks if we are logged in 

 




next();
}


module.exports.validatecard = (req, res, next) => {         //    it will validate every async function  of cardschema
    const { error } = cardschema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(",");
      throw new expresserror(msg, 400);
    } else {
      next();
    }
  };



  module.exports.isAuthor=async (req,res,next)=>{                   //it checks that only author can delete its card or review
    const { id } = req.params;
            const thiscard= await card.findById(id);
            console.log(req.user._id)
   const thisuser=await User.findById(req.user._id);
             console.log(thisuser,thiscard.author)
         if(!(thiscard.author===thisuser.name)){
          req.flash('error','you dont have permisson to do this' );
          return res.redirect(`/cards/${thiscard._id}`)
         }

         else{
           next();
         }
                 
  }


 