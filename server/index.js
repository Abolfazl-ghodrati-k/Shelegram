const express = require("express");
const { Server } = require("socket.io");
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const { corsConfig } = require("./controllers/serverController");
const {
  Authorization,
  addFriend,
  disconnect,
  dm,
  initializeUser,
} = require("./controllers/socketController");

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
app.use(express.json());

//! Routes
app.use("/auth", authRouter);
app.use("/profile", profileRouter);

app.get("/", (req, res) => res.send("Hi"));
io.use(Authorization);
io.on("connect", (socket) => {
  socket.on("initialize_user", async (cb) => {
    console.log("heyyyyy");
    const { parsedFriendList, messages } = await initializeUser(socket);
    cb({ friends: parsedFriendList, messages: messages });
  });
  socket.on("add_friend", async (friendName, cb) => {
    console.log("Adding friend");
    await addFriend(socket, friendName, cb);
  });
  socket.on("disconnect", () => disconnect(socket));
  socket.on("dm", (message, cb) => dm(socket, message, cb));
});

server.listen(5050, () => {
  console.log(app.get("env"));
});
