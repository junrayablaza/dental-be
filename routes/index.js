var express = require("express");
var router = express.Router();

const dentistController = require("../controllers/dentist.controller.js");
const timeSlotsController = require("../controllers/time-slots.controller.js");
const apptController = require("../controllers/appt.controller.js");

/* GET home page. */
router.get("/", async function (req, res, next) {
	res.render("index", { title: "Express" });
});

router.get("/dentist", dentistController.getDentist);

router.get("/time-slots", timeSlotsController.getTimeSlots);

router.post("/register-user-book-appt", apptController.registerUserBookAppt);

router.post("/login-user-book-appt", apptController.loginUserBookAppt);

module.exports = router;
