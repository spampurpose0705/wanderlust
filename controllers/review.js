const Reviews = require("../models/review");
const listing = require("../models/listing");

module.exports.create = async(req, res) => {
    let { id } = req.params;
    let Listing = await listing.findById(id);
    let newReview = new Reviews(req.body.review);
    newReview.author = req.user._id;
    Listing.reviews.push(newReview);

    await newReview.save();
    await Listing.save();

    req.flash("success", "Review added successfully.");
    res.redirect(`/listing/${id}`);
};

module.exports.delete = async(req, res)=> {
    let { id, reviewId } = req.params;

    await listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Reviews.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted successfully.");
    res.redirect(`/listing/${id}`);
};