const mongoose = require("mongoose");

const User = mongoose.model("User");
const Profile = mongoose.model("Profile");

module.exports.register = (req, res, next) => {
  var user = new User();
  user.fullName = req.body.fullName;
  user.email = req.body.email;
  user.save((err, userDoc) => {
    if (!err) {
      var newProfile = new Profile();
      newProfile.userId = userDoc._id;
      newProfile.email = req.body.email;
      newProfile.locations = [];
      newProfile.save((err, profileDoc) => {
        if (!err) {
          res.send(userDoc);
        } else {
          if (err.code == 11000) {
            res.status(422).send(["Duplicate profile found."]);
          } else {
            return next(err);
          }
        }
      });
    } else {
      if (err.code == 11000) {
        res.status(422).send(["Duplicate email adrress found."]);
      } else {
        return next(err);
      }
    }
  });
};

module.exports.getuser = (req, res, next) => {
  const userEmail = req.params.email;
  User.find({ email: userEmail }, (err, user) => {
    if (!err) {
      if (user) {
        if (user === undefined || user.length == 0) {
          res.status(404).send(["User not found."]);
        } else {
          res.send(user);
        }
      }
    } else {
      return next(err);
    }
  });
};
