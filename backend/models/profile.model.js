const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

var weatherProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: "User id can't be empty",
    unique: true
  },
  email: {
    type: String,
    required: "Email can't be empty",
    unique: true
  },
  locations: [{
      city: String
  }]
});

mongoose.model("Profile", weatherProfileSchema);
