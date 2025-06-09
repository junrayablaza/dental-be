import mysql from "mysql2";
import config from "../config.js";

var pool = mysql.createPool(config.mysqlPoolConfig).promise();

export async function getDentist() {
	const [rows] = await pool.query("SELECT * FROM dentist");
	return rows;
}
