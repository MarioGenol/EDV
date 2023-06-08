import mysql from 'mysql2';

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'Password*',
	database: ''
}).promise();

export async function getData() {
	const response = await pool.query('SELECT * FROM consumption.consumption');
	return response[0];
}

export async function getDataID(id) {
	const response = await pool.query(`SELECT * FROM consumption.consumption WHERE faculty = ${id}`);
	return response[0];
}

export async function getDataDay(id, day) {
	const response = await pool.query(`SELECT * FROM consumption.consumption WHERE faculty = ${id} and date(date) = \'${day}\'`);
	return response[0];
}

export async function getDataYear(id, year) {
	const response = await pool.query(`SELECT * FROM consumption.consumption WHERE faculty = ${id} and year(date) = \'${year}\'`);
	return response[0];
}

export async function getBuildings() {
	const response = await pool.query(`SELECT * FROM consumption.buildings ORDER BY name`);
	return response[0];
}
export async function getBuildingID(id) {
	const response = await pool.query(`SELECT * FROM consumption.buildings WHERE id = ${id}`);
	return response[0];
}