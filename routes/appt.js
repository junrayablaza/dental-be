var express = require("express");
const cookieJwtAuth = require("../middleware/cookieJwtAuth.js");
var router = express.Router();

const apptController = require("../controllers/appt.controller.js");

router.get(
	"/user-appts",
	[cookieJwtAuth.cookieJwtAuth],
	apptController.getUserAppts
);

router.post("/cancel", [cookieJwtAuth.cookieJwtAuth], apptController.cancel);

router.post(
	"/reschedule",
	[cookieJwtAuth.cookieJwtAuth],
	apptController.reschedule
);

module.exports = router;
