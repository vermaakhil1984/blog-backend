const express = require("express");
const {
  getAllUsers,
  registerController,
  loginControllers,
} = require("../controllers/userControllers");
const router = express.Router();
// get all users || GET
router.get("/all-users", getAllUsers);
// create user || POST
router.post("/register", registerController);
//login || POST
router.post("/login", loginControllers);

module.exports = router;
