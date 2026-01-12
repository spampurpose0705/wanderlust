const listing = require("../models/listing");

// INDEX
module.exports.index = async (req, res) => {
    const alllistings = await listing.find({});
    res.render("listing/index", { alllistings });
};

// NEW FORM
module.exports.newForm = (req, res) => {
    res.render("listing/new");
};

// SHOW
module.exports.show = async (req, res) => {
    let { id } = req.params;
    const onelisting = await listing
        .findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");

    if (!onelisting) {
        req.flash("error", "The listing you requested does not exist.");
        return res.redirect("/listing");
    }
    res.render("listing/view", { onelisting });
};

// EDIT FORM
module.exports.edit = async (req, res) => {
    let { id } = req.params;
    const onelisting = await listing.findById(id);

    if (!onelisting) {
        req.flash("error", "The listing you requested does not exist.");
        return res.redirect("/listing");
    }

    let originalUrl = onelisting.image.url.replace(
    "/upload/",
    "/upload/w_250,c_limit/" );
    res.render("listing/edit", { onelisting, originalUrl});
};

// UPDATE  ✅ (only required change: handle req.file)
module.exports.update = async (req, res) => {
    let updatelisting = req.body.listings;

    if (req.file) {
        updatelisting.image = {
            filename: req.file.filename,
            url: req.file.path
        };
    }

    await listing.findByIdAndUpdate(req.params.id, updatelisting);
    req.flash("success", "Listing edited successfully.");
    res.redirect(`/listing/${req.params.id}`);
};


// DELETE
module.exports.delete = async (req, res) => {
    await listing.findByIdAndDelete(req.params.id);
    req.flash("success", "Listing deleted successfully.");
    res.redirect("/listing");
};

// CREATE (POST) ✅ (only required change: handle req.file)
module.exports.create = async (req, res) => {
    let newlisting = req.body.listings;

    if (req.file) {
        // User uploaded image
        newlisting.image = {
            filename: req.file.filename,
            url: req.file.path
        };
    };

    newlisting.owner = req.user._id;
    await listing.create(newlisting);
    req.flash("success", "New listing created successfully.");
    res.redirect("/listing");
};
