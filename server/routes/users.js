const router = require("express").Router();
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const fb = require("../config/config");

const User = require("../models/user");

passport.serializeUser(function(user, done) {
  console.log("hello");
  done(null, user._id);
  // if you use Model.id as your idAttribute maybe you'd want
  // done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  new FacebookStrategy(
    {
      clientID: fb.appID,
      clientSecret: fb.appSecret,
      callbackURL: fb.callbackURL,
      profileFields: ["id", "displayName", "photos", "email"]
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ _id: profile.id }, (err, result) => {
        if (result) {
          done(null, result);
        } else {
          const user = new User({
            profileID: profile.id,
            fullname: profile.displayName,
            profilePic: profile.photos[0].value || "",
            email: profile.email
          });

          user.save(err => {
            done(null, user);
          });
        }
      });
    }
  )
);

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/users",
    failureRedirect: "/"
  })
);

router.get("/users", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

module.exports = router;
