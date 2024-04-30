const express = require("express");
const { Server } = require("socket.io");
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const {
	sessionMiddleware,
	wrap,
	corsConfig,
} = require("./controllers/serverController");
const { Authorization, AddFriend, Disconnect, dm } = require("./controllers/socketController");

require("dotenv").config();
const app = express();
module.exports = { app };

const server = require("http").createServer(app);

const io = new Server(server, {
	cors: corsConfig,
});

app.use(helmet());
app.use(cors(corsConfig));

app.set("trust proxy", 1);

app.use(sessionMiddleware);
app.use(express.json());

//! Routes
app.use("/auth", authRouter);

app.get("/", (req, res) => res.send("Hi"));
io.use(wrap(sessionMiddleware));
io.use(Authorization);
io.on("connect", (socket) => {
	socket.on("add_friend", (friendName, cb) => {
		AddFriend(socket, friendName, cb);
	});
	socket.on("disconnect", Disconnect)
    socket.on("dm", message => dm(socket, message))
});

server.listen(5050, () => {
	console.log(app.get("env"));
});