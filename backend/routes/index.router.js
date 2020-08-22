const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.post("/register", userController.register);
router.get("/getuser/:email", userController.getuser);

const profileController = require("../controllers/profile.controller");

router.post("/addlocation", profileController.addlocation);
router.get("/getprofile/:id", profileController.getprofile);
router.post("/deletelocation", profileController.deletelocation);

module.exports = router;
