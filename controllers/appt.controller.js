const config = require("../config.js");

const userModel = require("../models/user");
const apptModel = require("../models/appt");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUserBookAppt = async (req, res) => {
	const appt = req.body.appt || {};
	const user = req.body.user || {};

	// console.log(user);
	// res.send({
	// 	output: 0,
	// 	msg: "Test",
	// });
	// return false;

	if (!user.email) {
		res.send({
			output: 0,
			msg: "No email provided",
		});
		return false;
	}

	// check if email already exist
	var output = await userModel.emailExist(user.email);

	if (output) {
		res.send({
			output: 0,
			msg: "Email Address already exist.",
		});
		return false;
	}

	// check if appt is already booked
	var output = await apptModel.apptExist(appt);

	if (output) {
		res.send({
			output: 0,
			msg: "Selected Time Slot is no longer available.",
		});
		return false;
	}

	// hash password
	const saltRounds = 10;
	user.password = await bcrypt.hash(user.password, saltRounds);

	// register user
	var output = await userModel.addUser(user);

	appt.user_id = output.insertId;

	// book appt
	var output = await apptModel.addAppt(appt);

	// create session
	const token = jwt.sign(user, config.MY_SECRET, { expiresIn: "1h" });

	// response cookie token
	res.cookie("token", token, {
		httpOnly: true,
	});

	// reponse output
	res.send({
		output: 1,
		token: token,
		msg: "Successfully booked. Redirecting please wait..",
	});
};

exports.loginUserBookAppt = async (req, res) => {
	const appt = req.body.appt || {};
	const user = req.body.user || {};

	// console.log(user);
	// res.send({
	// 	output: 0,
	// 	msg: "Test",
	// });
	// return false;

	if (!user.email) {
		res.send({
			output: 0,
			msg: "No email provided",
		});
		return false;
	}

	// check if email already exist
	const userData = await userModel.getUserByEmail(user.email);

	if (!userData.id) {
		res.send({
			output: 0,
			msg: "Email not existing.",
		});
		return false;
	}

	// check if appt is already booked
	var output = await apptModel.apptExist(appt);

	if (output) {
		res.send({
			output: 0,
			msg: "Selected Time Slot is no longer available.",
		});
		return false;
	}

	// check password
	var output = await bcrypt.compare(user.password, userData.password);

	if (!output) {
		res.send({
			output: 0,
			msg: "Invalid credentials.",
		});
		return false;
	}

	appt.user_id = userData.id;

	// book appt
	var output = await apptModel.addAppt(appt);

	// create session
	const token = jwt.sign(userData, config.MY_SECRET, { expiresIn: "1h" });

	console.log(token);

	// response cookie token
	res.cookie("token", token, {
		httpOnly: true,
	});

	// reponse output
	res.send({
		output: 1,
		token: token,
		msg: "Successfully booked. Redirecting please wait..",
	});
};

exports.getUserAppts = async (req, res) => {
	try {
		const token = req.headers.authorization; // get browser token
		const user = jwt.verify(token, config.MY_SECRET); // get session details
		const user_id = user.id;

		console.log(user_id);

		// get user appts
		const result = await apptModel.getUserAppts(user_id);

		res.send({ output: 1, result });
	} catch (error) {
		res.send({ output: 0, msg: "Unauthenticated" });
	}
};

exports.cancel = async (req, res) => {
	try {
		const token = req.headers.authorization; // get browser token
		const user = jwt.verify(token, config.MY_SECRET); // get session details
		const user_id = user.id;
		const appt_id = req.body.appt_id || {};

		// cancel booking
		var output = apptModel.cancelAppt({ appt_id, user_id });

		res.send({ output: 1, msg: "Booking Cancelled" });
	} catch (error) {
		res.send({ output: 0, msg: "Unauthenticated" });
	}
};

exports.reschedule = async (req, res) => {
	try {
		const token = req.headers.authorization; // get browser token
		const user = jwt.verify(token, config.MY_SECRET); // get session details
		const user_id = user.id;

		let appt = req.body;

		// console.log(appt);
		// return false;

		const appt_id = appt.appt_id || {};
		appt.user_id = user_id;

		// check if NEW appt is already booked
		var output = await apptModel.apptExist(appt);

		if (output) {
			res.send({
				output: 0,
				msg: "Selected Time Slot is no longer available.",
			});
			return false;
		}

		// cancel booking
		var output = apptModel.cancelAppt({ appt_id, user_id });

		// enter new booking
		var output = await apptModel.addAppt(appt);

		res.send({
			output: 1,
			msg: "Appointment Successfully Rescheduled",
		});
	} catch (error) {
		res.send({ output: 0, msg: "Unauthenticated" });
	}
};
