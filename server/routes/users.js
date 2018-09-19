const router = require("express").Router();
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const uuid = require("uuid/v4");
const fb = require("../config/config");

const User = require("../models/user");

passport.use(
  new FacebookStrategy(
    {
      clientID: fb.appID,
      clientSecret: fb.appSecret,
      callbackURL: fb.callbackURL,
      profileFields: ["id", "displayName", "photos", "emails"]
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      User.findOne({ profileId: profile.id }, (err, result) => {
        if (result) {
          console.log("found");
          done(null, result);
        } else {
          console.log(profile);
          const user = new User({
            _id: uuid(),
            profileId: profile.id,
            name: profile.displayName,
            profilePic: profile.photos[0].value || "",
            email: profile.emails
          });
          console.log("New user", user);
          user.save(err => {
            done(null, user);
          });
        }
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
  // if you use Model.id as your idAttribute maybe you'd want
  // done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/"
  }),
  (req, res) => {
    res.redirect("http://localhost:4200/home?id=" + req.user._id);
  }
);

router.get("/users", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

router.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id).sort("name");
  res.send(user);
});

module.exports = router;
