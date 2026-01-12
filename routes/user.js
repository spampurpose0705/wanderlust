const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const WrapAsync = require("../util/WrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user");

router.route("/signup")
    .get(userController.newForm)
    .post(WrapAsync(userController.create));

router.route("/login")
    .get(userController.login)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", 
        { failureRedirect: "/login", failureFlash: true}),
        userController.loginCheck);

router.get("/logout", userController.logOut);

module.exports = router;