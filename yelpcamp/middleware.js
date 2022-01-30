//this middleware is used for login /logout and register authentication

module.exports.isloggedin=(req,res,next)=>{
    req.session.returnto=req.originalUrl;
    if(!req.isAuthenticated())
    {  req.flash('error','you must be signed in');
             return res.redirect('/login')
    
    }

    

    next();
}