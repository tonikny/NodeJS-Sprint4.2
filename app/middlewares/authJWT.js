const jwt = require("jsonwebtoken");
const jwtSecretToken = process.env.JWT_SECRET_TOKEN;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, jwtSecretToken);
        next();
    } catch (error) {
        res.status(401).json({ message: "No token provided" });
    }
};
