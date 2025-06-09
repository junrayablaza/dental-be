import mysql from "mysql2";
import config from "../config.js";

var pool = mysql.createPool(config.mysqlPoolConfig).promise();

export async function getTimeSlots(dentist_id, appt_date) {
	const params = [appt_date, dentist_id];

	const [rows] = await pool.query(
		`
		SELECT 
			lu.id,
			lu.time_start,
			lu.time_end,
			(
				CASE WHEN EXISTS (
					SELECT 1 
					FROM appt
					WHERE DATEDIFF(appt.appt_date, ?) = 0
					AND appt.dentist_id = ?
					AND appt.time_slot_id = lu.id
					AND appt.status_id = 1
				) THEN 'Unavailable' ELSE 'Available' END
			) as status
		FROM lu_time_slots lu
	`,
		params
	);
	return rows;
}
