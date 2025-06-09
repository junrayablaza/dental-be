const config = require("../config.js");
const jwt = require("jsonwebtoken");

exports.cookieJwtAuth = (req, res, next) => {
	const token = req.headers.authorization;

	// console.log("cookies " + token);

	try {
		const user = jwt.verify(token, config.MY_SECRET);
		req.user = user;
		next();
	} catch (error) {
		res.clearCookie("token");
		return res.redirect("/");
	}
};
