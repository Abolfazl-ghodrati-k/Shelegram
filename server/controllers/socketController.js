const pool = require("../db");
const redisClient = require("../redis");
const jwt = require("jsonwebtoken");
const { v4: uuidV4 } = require("uuid");

module.exports.Authorization = (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error"));
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return next(new Error("Authentication error"));
    }
    const username = decoded.username;
    const potentialLogin = await pool.query(
      "SELECT id, username, passhash, userid FROM users u WHERE u.username=$1",
      [username]
    );

    if (potentialLogin.rowCount === 0) {
      return next(new Error("Authentication error"));
    }

    socket.user = potentialLogin.rows[0];

    next();
  });
};

module.exports.initializeUser = async (socket) => {
  socket.join(socket.user.userid);

  redisClient.hset(
    `userid:${socket.user.username}`,
    "userid",
    socket.user.userid
  );
  redisClient.hset(`userid:${socket.user.username}`, "connected", "true");

  const FriendList = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0,
    -1
  );

  const parsedFriendList = await parseFriendList(FriendList);

  const friendRooms = parsedFriendList.map((friend) => friend.userid);

  if (friendRooms.length > 0)
    socket.to(friendRooms).emit("connected", "true", socket.user.username);

  const msgQuery = await redisClient.lrange(
    `chat:${socket.user.userid}`,
    0,
    -1
  );

  const messages = msgQuery.map((msgStr) => {
    const parsedStr = msgStr.split(".");
    return {
      to: parsedStr[0],
      from: parsedStr[1],
      content: parsedStr[2],
      id: parsedStr[3],
      date: parsedStr[4],
    };
  });

  if (messages && messages.length > 0) {
    socket.emit("messages", messages);
  }

  return {
    parsedFriendList,
    messages,
  };
};

module.exports.disconnect = async (socket) => {
  try {
    console.log("handle disconnect");
    await redisClient.hset(
      `userid:${socket.user.username}`,
      "connected",
      "false"
    );
    const friendList = await redisClient.lrange(
      `friends:${socket.user.username}`,
      0,
      1
    );

    const friendRooms = await parseFriendList(friendList).then((friends) =>
      friends.map((friend) => friend.userid)
    );
    socket.to(friendRooms).emit("connected", "false", socket.user.username);
  } catch (error) {
    console.log("error ");
  }
};

module.exports.addFriend = async (socket, friendName, cb) => {
  const friend = await redisClient.hgetall(`userid:${friendName}`);
  console.log("frined",friend);

  if (!friend || Object.keys(friend).length === 0) {
    cb({ done: false, errMsg: "User Doesnt exist" });
    return;
  }

  if (friendName == socket.user.username) {
    cb({ done: false, errMsg: "cannot add self" });
    return;
  }

  const currentFriendList = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0,
    -1
  );

  if (
    currentFriendList &&
    currentFriendList.some((friendId) => friendId.includes(friend.userid))
  ) {
    cb({ done: false, errMsg: "friend already exsits" });
    return;
  }

  await redisClient.lpush(
    `friends:${socket.user.username}`,
    [friendName, friend.userid].join(".")
  );

  await redisClient.lpush(
    `friends:${friendName}`,
    [socket.user.username, socket.user.userid].join(".")
  );

  const newUser = {
    username: friendName,
    userid: friend.userid,
    connected: friend.connected,
  };

  cb({ done: true, newUser });
};

const parseFriendList = async (friendList) => {
  const newFriendList = [];
  for (let friend in friendList) {
    const parsedFriend = friendList[friend].split(".");
    const friendConnected = await redisClient.hget(
      `userid:${parsedFriend[0]}`,
      "connected"
    );
    newFriendList.push({
      username: parsedFriend[0],
      userid: parsedFriend[1],
      connected: friendConnected,
    });
  }
  return newFriendList;
};

module.exports.dm = async (socket, message, cb) => {
  const id = uuidV4();
  const date = new Date();
  const parsedMessage = { ...message, from: socket.user.userid, id, date };
  const messageString = [
    parsedMessage.to,
    parsedMessage.from,
    parsedMessage.content,
    parsedMessage.id,
    parsedMessage.date,
  ].join(".");
  await redisClient.lpush(`chat:${message.to}`, messageString);
  await redisClient.lpush(`chat:${socket.user.userid}`, messageString);

  console.log(messageString);
  cb({ newMessage: parsedMessage });

  socket.to(parsedMessage.to).emit("dm", parsedMessage);
};
