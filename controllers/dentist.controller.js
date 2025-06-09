const dentist = require("../models/dentist");

exports.getDentist = async (req, res) => {
	const result = await dentist.getDentist();
	res.send({
		output: 1,
		result,
	});
};
