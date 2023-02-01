const express = require("express");
const { Server } = require("socket.io");
const helmet = require("helmet");
require('dotenv').config();
const session = require("express-session")
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const app = express();

const server = require("http").createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://127.0.0.1:3000",
		credentials: "true",
	},
});

app.use(helmet());
app.use(
	cors({
		origin: "http://127.0.0.1:3000",
		credentials: true,
	})
);
app.use(session({
	secret: process.env.COOKIE_SECRET,
	credentials: true,
	resave:false,
	saveUninitialized:false,
	cookie: {
		secure: process.env.ENVIRONMENT == "production",
		httpOnly: true,
		sameSite: process.env.ENVIRONMENT == "production" ? "none" : "lax"
	}
}))
app.use(express.json());

//! Routes
app.use("/auth", authRouter);

app.get("/", (req, res) => res.send("Hi"));

io.on("connect", (socket) => {});

server.listen(4000, () => {
	console.log("server running on port 4000");
});
