const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

var userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: "Full name can't be empty"
  },
  email: {
    type: String,
    required: "Email can't be empty",
    unique: true
  }
});

mongoose.model("User", userSchema);
