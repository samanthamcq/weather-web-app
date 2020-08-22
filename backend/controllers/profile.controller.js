const mongoose = require("mongoose");

const Profile = mongoose.model("Profile");

module.exports.addprofile = (req, res, next) => {
  var newProfile = new Profile();
  newProfile.userId = req.body.userId;
  newProfile.email = req.body.email;
  newProfile.locations = req.body.locations;
  newProfile.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      if (err.code == 11000) {
        res.status(422).send(["Duplicate profile found."]);
      } else {
        return next(err);
      }
    }
  });
};

module.exports.addlocation = (req, res, next) => {
  let myquery = { userId: req.body.userId };
  Profile.find(myquery, (err, doc) => {
    if (doc.length == 0) {
      res.status(404).send(["Not found."]);
    } else {
      let locationArray = doc[0].locations;
      for (var i = 0; i < locationArray.length; i++) {
        if (locationArray[i].city === req.body.city) {
          res.send(doc);
          return;
        }
      }

      locationArray.push({ city: req.body.city });
      let newLocations = { $set: { locations: locationArray } };

      Profile.updateOne(myquery, newLocations, (err, data) => {
        if (!err) {
          Profile.find(myquery, (err, doc) => {
            if (!err) {
              res.send(doc);
            } else {
              return next(err);
            }
          });
        } else {
          return next(err);
        }
      });
    }
  });
};

module.exports.getprofile = (req, res, next) => {
  Profile.find({ userId: req.params.id }, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      return next(err);
    }
  });
};

module.exports.deletelocation = (req, res, next) => {
  let myquery = { userId: req.body.userId };

  Profile.find(myquery, (err, doc) => {
    if (!doc) {
      res.status(404).send(["Profile not found."]);
    } else {
      let locationArray = doc[0].locations;
      for (var i = 0; i < locationArray.length; i++) {
        if (locationArray[i].city === req.body.city) {
          locationArray.splice(i, 1);
          break;
        }
      }

      let newLocations = { $set: { locations: locationArray } };
      Profile.updateOne(myquery, newLocations, (err, doc) => {
        if (!err) {
          Profile.find(myquery, (err, doc) => {
            if (!err) {
              res.send(doc);
            } else {
              return next(err);
            }
          });
        } else {
          return next(err);
        }
      });
    }
  });
};
