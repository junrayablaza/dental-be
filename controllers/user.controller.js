// main
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// global
const config = require("../config.js");

// model
const userModel = require("../models/user");
const apptModel = require("../models/appt");

exports.login = async (req, res) => {
	const email = req.body.email || {};
	const password = req.body.password || {};

	if (!email || !password) {
		res.send({
			output: 0,
			msg: "Invalid email and password",
		});
		return false;
	}

	// check email
	var userData = await userModel.getUserByEmail(email);

	if (!userData.id) {
		res.send({
			output: 0,
			msg: "Email not existing.",
		});
		return false;
	}

	// compare password
	var output = await bcrypt.compare(password, userData.password);

	if (!output) {
		res.send({
			output: 0,
			msg: "Invalid credentials.",
		});
		return false;
	}

	// create session
	const token = jwt.sign(userData, config.MY_SECRET, { expiresIn: "1h" });

	// response cookie token
	res.cookie("token", token, {
		httpOnly: true,
	});

	// reponse output
	res.send({
		output: 1,
		token: token,
		msg: "Successfully logged in. Redirecting please wait..",
	});
};

exports.dashboard = async (req, res) => {
	res.send({ output: 1 });
};

exports.logout = async (req, res) => {
	res.cookie("token", "", {
		expires: new Date(Date.now() + 10 * 1000),
	});
	res.send({ output: 1 });
};

exports.details = async (req, res) => {
	try {
		const token = req.headers.authorization; // get browser token
		const user = jwt.verify(token, config.MY_SECRET); // get session details

		res.send({ output: 1, user_name: user.name });
	} catch (error) {
		res.send({ output: 0, msg: "Unauthenticated" });
	}
};
