const User = require("../models/user");

module.exports.newForm =  (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.create = async (req, res) => {
    try{
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password); 
        // console.log(registeredUser);
        req.login(registeredUser, (err)=> {
            if(err){
                next(err);
            }else{
                req.flash("success", "Welcome to wanderlust");
                res.redirect("/listing");
            };
        })
    }catch(err){
        req.flash("error", "The username you entered already exists.");
        res.redirect("/signup");
    };
};

module.exports.login = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.loginCheck =  async(req, res) => {
  req.flash("success", "Your logged in on Wanderlust.")
  
//   let redirectUrl = res.locals.redirectUrl || "/listing";
// or
//
let redirectUrl ;
if(res.locals.redirectUrl){
    redirectUrl = res.locals.redirectUrl;
}else{
    redirectUrl = "/listing";
}
//
  res.redirect(redirectUrl);
};

module.exports.logOut = (req, res, next) => {
    req.logOut((err)=> {
        if(err){
            next(err);
        }else{
            req.flash("success", "You are logged out.");
            res.redirect("/listing");
        };
    });
};