const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redisClient = require("../redis");
const { app } = require("../index");

const sessionMiddleware = session({
	secret: "process.env.COOKIE_SECRET",
	store: new RedisStore({ client: redisClient }),
	name: "sid",
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: "true",
		httpOnly: true,
		expires: 1000 * 60 * 60 * 24,
		sameSite: "lax",
	},
});

const wrap = (expressMiddleWare) => (socket, next) =>
	expressMiddleWare(socket.request, {}, next);

const corsConfig = {
	origin: "http://localhost:5000",
	credentials: true,
};
module.exports = { sessionMiddleware, wrap, corsConfig };
