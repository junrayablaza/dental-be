import mysql from "mysql2";
import config from "../config.js";

var pool = mysql.createPool(config.mysqlPoolConfig).promise();

export async function emailExist(email) {
	try {
		const query = `SELECT 1 FROM user WHERE email = ? LIMIT 1`;
		const [results, fields] = await pool.query(query, [email]);

		return results.length ? true : false;
	} catch (err) {
		throw err;
	}
}

export async function addUser(params) {
	try {
		const query = `INSERT INTO user 
						(
							name,
							contact_no,
							address,
							email,
							password
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
			params.name,
			params.contact_no,
			params.address,
			params.email,
			params.password,
		]);
		return results;
	} catch (err) {
		throw err;
	}
}

export async function getUserByEmail(email) {
	try {
		const query = `SELECT * FROM user WHERE email = ? LIMIT 1`;
		const [results] = await pool.query(query, [email]);
		return results.length ? results[0] : {};
	} catch (err) {
		throw err;
	}
}
