const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = decoded; // Store decoded user data on request for future use
        next();
    });
};

const corsConfig = {
    origin: "http://localhost:5000",
    credentials: true,
};

module.exports = {  corsConfig, verifyToken };
