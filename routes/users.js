var express = require("express");
const cookieJwtAuth = require("../middleware/cookieJwtAuth.js");
var router = express.Router();

const userController = require("../controllers/user.controller.js");

router.post("/login", [], userController.login);

router.get("/logout", [cookieJwtAuth.cookieJwtAuth], userController.logout);

router.get("/details", [cookieJwtAuth.cookieJwtAuth], userController.details);

module.exports = router;
