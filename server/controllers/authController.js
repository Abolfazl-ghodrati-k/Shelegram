const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidV4 } = require("uuid");

module.exports.handleLogin = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.json({ loggedIn: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.json({ loggedIn: false, message: "Invalid Token" });
        } else {
            const { id, username } = decoded;
            const existingUser = await pool.query(
                "SELECT username from users WHERE username=$1",
                [username]
            );
            if (existingUser.rowCount > 0) {
                res.json({ loggedIn: true, token, username: username });
            } else {
                res.json({ loggedIn: false, message: "User Doesnt exist" });
            }
        }
    });
};

module.exports.handleSignUp = async (req, res) => {
    const existingUser = await pool.query(
        "SELECT username from users WHERE username=$1",
        [req.body.username]
    );
    if (existingUser.rowCount === 0) {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const newUserQuery = await pool.query(
            "INSERT INTO users(username, passhash, userId) values($1,$2,$3) RETURNING id, userId",
            [req.body.username, hashedPass, uuidV4()]
        );
        const user = {
            id: newUserQuery.rows[0].id,
            username: req.body.username,
            userId: newUserQuery.rows[0].userId,
        };
        const token = jwt.sign(user, process.env.JWT_SECRET);
        res.json({ loggedIn: true, token, username: user.username });
    } else {
        res.json({ loggedIn: false, message: "Username taken" });
    }
};

module.exports.SignInAttempt = async (req, res) => {
    const potentialLogin = await pool.query(
        "SELECT id, username, passhash, userId FROM users u WHERE u.username=$1",
        [req.body.username]
    );
    if (potentialLogin.rowCount !== 0) {
        const isSamePass = await bcrypt.compare(
            req.body.password,
            potentialLogin.rows[0].passhash
        );
        if (isSamePass) {
            const user = {
                id: potentialLogin.rows[0].id,
                username: req.body.username,
                userId: potentialLogin.rows[0].userId,
            };
            const token = jwt.sign(user, process.env.JWT_SECRET);
            res.json({ loggedIn: true, username: user.username, token });
        } else {
            res.json({
                loggedIn: false,
                message: "Wrong username or password",
            });
        }
    } else {
        res.json({
            loggedIn: false,
            message: "Wrong username or password",
        });
    }
};
