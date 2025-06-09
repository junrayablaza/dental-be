import mysql from "mysql2";
import config from "../config.js";

var pool = mysql.createPool(config.mysqlPoolConfig).promise();

export async function apptExist(params) {
	try {
		const query = `
			SELECT 1 
			FROM appt
			WHERE DATEDIFF(appt.appt_date, ?) = 0
			AND appt.dentist_id = ?
			AND appt.time_slot_id = ?
			AND appt.status_id = 1 LIMIT 1
		`;
		const [results] = await pool.query(query, [
			params.appt_date,
			params.dentist_id,
			params.time_slot_id,
		]);

		return results.length ? true : false;
	} catch (err) {
		throw err;
	}
}

export async function addAppt(params) {
	try {
		const query = `INSERT INTO appt 
						(
							user_id,
							dentist_id,
							appt_date,
							time_slot_id,
							status_id
						) 
						VALUES(
							?,
							?,
							?,
							?,
							?
						)
		`;
		const [results] = await pool.query(query, [
			params.user_id,
			params.dentist_id,
			params.appt_date,
			params.time_slot_id,
			1, // booked
		]);
		return results;
	} catch (err) {
		throw err;
	}
}

export async function getUserAppts(user_id) {
	try {
		const query = `
			SELECT
				a.id,
				d.name as dentist,
				d.specialization,
				DATE_FORMAT(a.appt_date, "%d-%b-%Y") as appt_date,
				ts.time_start,
				ts.time_end,
				st.status
			
			FROM appt as a

			LEFT JOIN dentist as d 
			ON d.id = a.dentist_id

			LEFT JOIN lu_time_slots as ts 
			ON ts.id = a.time_slot_id

			LEFT JOIN lu_appt_status as st
			ON st.id = a.status_id

			WHERE user_id = ?
		`;
		const [results] = await pool.query(query, [user_id]);
		return results;
	} catch (err) {
		throw err;
	}
}

export async function cancelAppt(params) {
	try {
		const query = `
			UPDATE appt SET 
			status_id = 2
			WHERE user_id = ?
			AND id = ?
			AND status_id != 2
		`;
		const [results] = await pool.query(query, [
			params.user_id,
			params.appt_id,
		]);
		return results;
	} catch (err) {
		throw err;
	}
}
