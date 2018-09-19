const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("./models/user");
const cors = require("cors");

const app = express();

const users = require("./routes/users");

mongoose.connect(
  "mongodb://localhost:27017/socialLogin",
  function(err) {
    if (err) {
      console.log("Connection Error : " + err);
      process.exit(1);
    } else {
      console.log("Connection established to Mongo DB");
    }
  }
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(morgan("tiny"));

app.use(cors());
app.use("/", users);

app.listen(8000, err => {
  if (err) throw err;
});
