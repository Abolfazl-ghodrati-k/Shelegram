const express = require("express");
const router = express.Router();
const validateForm = require("../controllers/validateForm");
const pool = require("../db");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
	validateForm(req, res);
	const exsitingUser = await pool.query(
		"SELECT username from users WHERE username=$1",
		[req.body.username]
	);
	if (exsitingUser.rowCount == 0) {
		const hashedPass = await bcrypt.hash(req.body.password, 10);
		const newUserQuery = await pool.query(
			"INSERT INTO users(username, passhash) values($1,$2) RETURNING id",
			[req.body.username, hashedPass]
		);
		req.session.user = {
			username: req.body.username,
			id: newUserQuery.rows[0].id,
		};
		res.json({ loggedIn: true, username: req.body.username });
	} else {
		res.json({ loggedIn: false, status: "Username taken" });
	}
});

router.post("/login", async (req, res) => {
	validateForm(req, res);
	const potentialLogin = await pool.query(
		"SELECT id, username passhash FROM users u WHERE u.username=$1",
		[req.body.username]
	);
	if (potentialLogin.rowCount != 0) {
		const isSamePass = await bcrypt.compare(
			req.body.password,
			potentialLogin.rows[0].passhash
		);
		if (isSamePass) {
		} else {
			req.session.user = {
				username: req.body.username,
				id: potentialLogin.rows[0].id,
			};
			res.json({ loggedIn: true, username: req.body.username });
		}
	} else {
		console.log("not good");
		res.json({ loggedIn: false, message: "Wrong username or password" });
	}
});

module.exports = router;
