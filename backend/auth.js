const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const decodetoken = jwt.verify(
            token,
            "RENDOM TOKEN"
        );

        const user = decodetoken;

        req.user = user

        next()
    } catch (error) {
        res.status(401).json({
            error: new Error("Invalid request!"),
          });
    }
}