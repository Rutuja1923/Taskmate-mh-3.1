const express = require("express");
const { handleUserSignup, handleUserLogin, handleUserLogout } = require("../controllers/authController");
const { checkForAuthentication} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);
router.post("/logout",checkForAuthentication, handleUserLogout);

module.exports = router;
