const express = require("express");
const router = express.Router();

const WrapAsync = require("../util/WrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingController = require("../controllers/listing");

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });
//this is to tell that the destination for the files will be the above given folder.

router
  .route("/")
  .get(WrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("image"),   // ✅ matches <input name="image">
    validateListing,
    WrapAsync(listingController.create)
  );


// new form
router.get("/new", isLoggedIn, listingController.newForm);

router
  .route("/:id")
  .get(WrapAsync(listingController.show))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("image"),   // ✅ REQUIRED
    WrapAsync(listingController.update)
  )
  .delete(isLoggedIn, isOwner, WrapAsync(listingController.delete));

// edit
router.get("/:id/edit", isLoggedIn, isOwner, WrapAsync(listingController.edit));

module.exports = router;
