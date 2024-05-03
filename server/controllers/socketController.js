const redisClient = require("../redis");
const jwt = require("jsonwebtoken");

module.exports.Authorization = (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error("Authentication error"));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new Error("Authentication error"));
        }
        socket.user = decoded; // Store decoded user data on socket for future use
        next();
    });
};

module.exports.initializeUser = async (socket) => {
    // It assigns user data from the session to the socket.user object. This likely contains information about the user, such as their username, user ID, etc.
    socket.user = { ...socket.request.session.user };
    // It joins the socket user to a room identified by their user ID. This allows the server to send messages specifically to this user.
    socket.join(socket.user.userId);
    // It updates the user's status in a Redis hash data structure. This likely marks the user as connected, associating their username with their user ID and setting their connection status to true.
    redisClient.hset(
        `userid: ${socket.user.username}`,
        "userId",
        socket.user.userId,
        "connected",
        true
    );
    // It fetches the user's friend list from Redis using a list data structure. This list may contain the usernames or user IDs of the user's friends.
    const FriendList = await redisClient.client.lrange(
        `friends:${socket.user.username}`,
        0,
        -1
    );
    // It parses the fetched friend list to a more usable format, likely an array of objects containing information about each friend.
    const parsedFriendList = await parseFriendList(FriendList);
    // It notifies the user's friends who are currently online that the user has connected. It emits a "connected" event to their respective rooms
    const friendRooms = parsedFriendList.map((friend) => friend.userId);
    if (friendRooms.length > 0)
        socket.to(friendRooms).emit("connected", true, socket.user.username);
    // It sends the parsed friend list to the connected user. This allows the user to see their friends' information, such as usernames and online status.
    socket.emit("friends", parsedFriendList);
    // It fetches the chat message history for the user from Redis. This likely contains messages sent to the user or messages the user has sent.
    const msgQuery = await redisClient.lrange(
        `chat:${socket.user.userId}`,
        0,
        -1
    );
    // It parses the fetched message history to a more usable format, likely an array of objects containing message information such as sender, receiver, and message content.
    const messages = msgQuery.map((msgStr) => {
        const parsedStr = msgStr.split(".");
        return { to: parsedStr[0], from: parsedStr[1], content: parsedStr[2] };
    });
    // If there are messages in the history, it sends the message history to the connected user. This allows the user to see their chat history upon connecting.
    if (messages && messages.length > 0) {
        socket.emit("messages", messages);
    }
};

module.exports.disconnect = async (socket) => {
    try {
		console.log("handle disconnect")
        await redisClient.hset(
            `userid:${socket.user.username}`,
            "connected",
            false
        );
        const friendList = await redisClient.lrange(
            `friends:${socket.user.username}`,
            0,
            1
        );

        const friendRooms = await parseFriendList(friendList).then((friends) =>
            friends.map((friend) => friend.userId)
        );
        socket.to(friendRooms).emit("connected", false, socket.user.username);
    } catch (error) {
        console.log("error ");
    }
};

module.exports.addFriend = async (socket, friendName, cb) => {
    const friend = await redisClient.hgetall(`userid:${friendName}`);
    if (!friend) {
        cb({ done: false, errMsg: "User Doesnt exist" });
        return;
    }
    if (friendName == socket.user.username) {
        cb({ done: false, errMsg: "cannot add self" });
        return;
    }
    const currentFriendList = await redisClient.client.lrange(
        `friends:${socket.user.username}`,
        0,
        -1
    );
    if (currentFriendList && currentFriendList.indexOf(friendName) !== -1) {
        cb({ done: false, errMsg: "friend already exsits" });
        return;
    }
    await redisClient.lpush(
        `friends:${socket.user.username}`,
        [friendName, friend.userId].join(".")
    );
    const newUser = {
        username: friendName,
        userId: friend.userId,
        connected: friend.connected,
    };
    cb({ done: true, newUser });
};

const parseFriendList = async (friendList) => {
    const newFriendList = [];
    for (let friend in friendList) {
        const parsedFriend = friend.split(".");
        const friendConnected = await redisClient.hget(
            `userid:${parsedFriend[0]}`,
            "connected"
        );
        newFriendList.push({
            username: parsedFriend[0],
            userId: parsedFriend[1],
            connected: friendConnected,
        });
    }
    return newFriendList;
};

module.exports.dm = async (socket, message) => {
    const parsedMessage = { ...message, from: socket.user.userId };
    const messageString = [
        parsedMessage.to,
        parsedMessage.from,
        parsedMessage.content,
    ].join(".");
    await redisClient.lpush(`chat:${message.to}`, messageString);
    await redisClient.lpush(`chat:${socket.user.userId}`, messageString);

    socket.to(parsedMessage.to).emit("dm", parsedMessage);
};
