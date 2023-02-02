const express = require("express");
const { Server } = require("socket.io");
const helmet = require("helmet");
require("dotenv").config();
const session = require("express-session");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const app = express();
const RedisStore = require('connect-redis')(session)
const redisClient = require('./redis')

const server = require("http").createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://127.0.0.1:5000",
		credentials: "true",
	},
});

app.use(helmet());
app.use(
	cors({
		methods: ["GET", "POST"],
		origin: "http://127.0.0.1:5000",
		credentials: true,
	})
);

app.set("trust proxy", 1);

app.use(
	session({
		secret: process.env.COOKIE_SECRET,
		store: new RedisStore({client: redisClient}),
		name: "sid",
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: app.get("env") === "production" ? "true" : "auto",
			httpOnly: true,
			expires: 1000 * 60 * 60 * 24,
			sameSite: app.get("env") === "production" ? "none" : "lax",
		},
	})
);
app.use(express.json());

//! Routes
app.use("/auth", authRouter);

app.get("/", (req, res) => res.send("Hi"));

io.on("connect", (socket) => {});

server.listen(5050, () => {
	console.log(app.get("env"));
});
