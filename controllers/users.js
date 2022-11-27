const user=require('../models/user');
const passport = require('passport');
const sgMail = require('@sendgrid/mail')

module.exports.renderregisterform=(req,res)=>{
    res.render('users/register')
}

module.exports.registeruser=async(req,res,next)=>{
    try{
   const{email,username,password}=req.body;

   const thisuser=new user({email,username});//checks if username is available or  not and if not then makes the username

   const registereduser=await user.register(thisuser,password)//it takes useranme and password and  salts after hashing store them in db
       req.login(registereduser,err=>{
           if(err) return next(err);
       })
  //sending an welcame email
  // console.log(registereduser);

 //(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: email, // Change to your recipient
  from: 'rajarishabh48@gmail.com', // Change to your verified sender
  subject: 'Welcome to yelpcamp',
  text: ' we hope we are enjoying thhis experience',
  html: '<strong>Welcome !!! we hope you enjoy your time and find your camp):</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    //console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
       

   req.flash('success',"welcome to CampStore");
   res.redirect('/campgrounds')
    }

    catch(e)
    {
        req.flash('error',e.message)
        res.redirect('/register')
    }

    
}
module.exports.loginuser=(req,res)=>{
 
    req.flash('success',`welcome back ${req.user.username}`);
    const return_to=req.session.returnto;
    delete req.session.returnto;
    //console.log(req.session.returnto)
    const redirect_to=( return_to || '/campgrounds')
    delete req.session.returnto;
    


res.redirect(redirect_to);

    
}

module.exports.logoutuser=(req,res)=>{
    
    req.flash('success',`see you soon ${req.user.username}`);
    req.logout();
    res.redirect('/');
}

module.exports.renderloginform=(req,res)=>{
    res.render('users/login')
}