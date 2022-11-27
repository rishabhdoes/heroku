const user=require('../models/user');
const passport = require('passport');
const nodemailer = require('nodemailer')
const catchasync = require("../utilities/catchasync");
const expresserror = require("../utilities/expresserror");

module.exports.renderregisterform=(req,res)=>{
    res.render('users/register')
}

module.exports.renderotpauthform=(req,res)=>{
    res.render('users/otpauth')
}
module.exports.verifyotp=async (req,res)=>{
   
  const otp=req.body.o1st+req.body.o2nd+req.body.o3rd+req.body.o4th;
  console.log(req.session.otp);
 console.log(otp)
  if(otp!=req.session.otp)
  {  req.flash('error',"ek otp nhi dal rha tumse!! shi se daal");
    return res.redirect('/verification');
  }
    //req.flash('success',`welcome back ${req.user.username}`);
    const return_to=req.session.returnto;
    delete req.session.returnto;
    //console.log(req.session.returnto)
    const redirect_to=( return_to || '/cards')
    delete req.session.returnto;
    
      const activeuser=await user.findOneAndUpdate({email:req.session.email},{verified:true});


res.redirect(redirect_to);

    
}

module.exports.registeruser=async(req,res,next)=>{
    try{
   const{email,usname,password,mobile,year,room_no,hostel}=req.body;
      let wholemail=email.split('@');
      const part=wholemail[1];
      console.log(part);

      if(part!="student.nitw.ac.in")
      {
        throw new expresserror("please login from student mail", 400);
      }
       const username=wholemail[0];
  let name=usname;
      //console.log(req.body);
   const thisuser=new user({email,username,name,mobile,year,room_no,hostel});
  
   console.log(thisuser)
   const registereduser=await user.register(thisuser,password)//it takes useranme and password and  salts after hashing store them in db
       req.login(registereduser,err=>{
           if(err) return next(err);
       })


       
  //sending an welcame email
   //console.log(registereduser,email);

 //(process.env.SENDGRID_API_KEY);
 
 let otp=Math.floor(1000 + Math.random() * 9000)
 otp=parseInt(otp);
  req.session.otp=otp;
  console.log(otp);
 let transpoter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
        user: "mcxconsumer@gmail.com",
        pass: "qfbnappnkqxkwsmc"
    }
});


let mailOption = {
    from: "mcxconsumer@gmail.com",
    to: email,
    subject: 'OTP Code',
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
      <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Your Brand Inc</p>
        <p>1600 Amphitheatre Parkway</p>
        <p>California</p>
      </div>
    </div>
  </div>`
};

transpoter.sendMail(mailOption, async (error, info)=>{
    if(error){
        console.log(error);
    }else{
        console.log("Email sent: " + info.response);
    }
});
  req.session.email=email;
  res.redirect('/verification');

    }

    catch(e)
    { console.log("op");
        req.flash('error',e.message)
        res.redirect('/register')
    }

    
};

module.exports.loginuser=async (req,res)=>{
   
    const thatuser=await user.find({email:req.session.email});

 if(thatuser.isverified==false)
 {  req.flash('error','you havent verified ur email');
     return res.redirect('/verification');
 }

    req.flash('success',`welcome back ${req.user.username}`);
    const return_to=req.session.returnto;
    delete req.session.returnto;
    //console.log(req.session.returnto)
    const redirect_to=( return_to || '/cards')
    delete req.session.returnto;
    


return res.redirect(redirect_to);

    
}

module.exports.logoutuser=(req,res)=>{
    
    req.flash('success',`see you soon ${req.user.username}`);
    req.logout();
    res.redirect('/');
}

module.exports.renderloginform=(req,res)=>{
    res.render('users/login')
}

