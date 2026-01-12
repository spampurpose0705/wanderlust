const listing = require("./models/listing")
const Review = require("./models/review")
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./util/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirect = req.originalUrl;
        req.flash("error", "You need to be logged in to do this.");
        res.redirect("/login");
    }else{
        next();
    };
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirect){
        res.locals.redirectUrl = req.session.redirect;
    };
    next();
};

module.exports.isOwner = async(req, res, next) => {
    let findListing = await listing.findById(req.params.id);
    if(!findListing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the owner of this listing.");
        return res.redirect(`/listing/${req.params.id}`);
    };
    next();
};

module.exports.validateListing = (req, res, next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
    }else{
        next();
    }
};

module.exports.validateReview = (req, res, next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
    }else{
        next();
    }
};

module.exports.isReviewAuthor = async(req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId)
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the author of this review.");
        return res.redirect(`/listing/${id}`);
    };
    next();
};