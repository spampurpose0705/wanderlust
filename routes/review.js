const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../util/WrapAsync");
const ExpressError = require("../util/ExpressError");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const {isLoggedIn, validateReview, isReviewAuthor} = require("../middleware.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Reviews = require("../models/review.js");
const listing = require("../models/listing.js");

const reviewController = require("../controllers/review");

router.use(methodOverride("_method"));

//Post route
router.post("/", isLoggedIn, validateReview , WrapAsync(reviewController.create));

//delete review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, WrapAsync(reviewController.delete)
);

module.exports = router ;