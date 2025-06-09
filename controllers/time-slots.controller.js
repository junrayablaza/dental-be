const timeSlots = require("../models/time-slots");

exports.getTimeSlots = async (req, res) => {
	const dentist_id = req.query.dentist_id;
	const appt_date = req.query.appt_date;

	const result = await timeSlots.getTimeSlots(dentist_id, appt_date);
	res.send({
		output: 1,
		result,
	});
};
