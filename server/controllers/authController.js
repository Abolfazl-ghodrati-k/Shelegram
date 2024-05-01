const pool = require("../db");
const bcrypt = require("bcrypt");
const {v4 : uuidV4} = require('uuid')

module.exports.handleLogin = async (req, res) => {
	// if (req.session && req.session.user.username) {
	// 	res.json({ loggedIn: true, username: req.session.user.username });
	// } else {
	// 	res.json({ loggedIn: false });
	// }
	console.log(req.session);
};
module.exports.handleSignUp = async (req, res) => {
	const exsitingUser = await pool.query(
		"SELECT username from users WHERE username=$1",
		[req.body.username]
	);
	console.log(exsitingUser)
	if (exsitingUser.rowCount == 0) {
		const hashedPass = await bcrypt.hash(req.body.password, 10);
		const newUserQuery = await pool.query(
			"INSERT INTO users(username, passhash, userId) values($1,$2,$3) RETURNING id, userId",
			[req.body.username, hashedPass, uuidV4()]
		);
		req.session.user = {
			username: req.body.username,
			id: newUserQuery.rows[0].id,
			userId: newUserQuery.rows[0].id
		};
		res.json({ loggedIn: true, username: req.session });
	} else {
		res.json({ loggedIn: false, status: "Username taken" });
	}
};

module.exports.SignInAttempt = async (req, res) => {
	const potentialLogin = await pool.query(
		"SELECT id, username, passhash, userId FROM users u WHERE u.username=$1",
		[req.body.username]
	);
	// console.log(potentialLogin)
	if (potentialLogin.rowCount != 0) {
		const isSamePass = await bcrypt.compare(
			req.body.password,
			potentialLogin.rows[0].passhash
		);
		if (isSamePass) {
			req.session.user = {
				username: req.body.username,
				id: potentialLogin.rows[0].id,
				userId: potentialLogin.rows[0].userId
			};
			res.json({ loggedIn: true, username: req.session });
		} else {
			res.json({ loggedIn: false, message: "Wrong  password" });
		}
	} else {
		console.log("not good");
		res.json({
			loggedIn: false,
			message: "Wrong username or password",
		});
	}
};
