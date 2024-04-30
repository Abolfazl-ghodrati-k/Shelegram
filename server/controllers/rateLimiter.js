const redisClient = require("../redis");

module.exports.rateLimiter = (secondsLimit, limitAmount) => async (req, res, next) => {
    const ip = req.connection.remoteAddress;
    const key = `rate_limit:${ip}`; // Define a key for the rate limiter
    const response = await redisClient.multi()
        .incr(key) // Increment the counter for the specified key
        .expire(key, secondsLimit) // Set expiration time for the key
        .exec();
    
    if (response[1] > limitAmount) {
        res.json({
            loggedIn: false,
            message: "tu mara hamla mikuni kunkash? rmzi kiru mikhay? bia be khodam begu",
        });
    } else {
        next();
    }
};
