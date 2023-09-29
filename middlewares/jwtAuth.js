const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    // splitting token
    const splitToken = token.split(' ')[1];

    if (!splitToken) {
        return res.status(404).json({message: "Access Denied. no token found"})
    }

    try {

        const decoded = jwt.verify(splitToken, 'secret');

        req.user = decoded;

        next();

    } catch(err) {
        console.error(err.message);
        res.status(401).json({message: "Access Denied. Invalid Token"})
    }   
}

module.exports = jwtMiddleware;
