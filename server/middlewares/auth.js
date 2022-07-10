const JWT = require('jsonwebtoken');

async function generateToken(payload) {
    try {
        const token = JWT.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRE_IN
        })
        const refreshToken = JWT.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN
        })
        return {
            token,
            refreshToken
        }
    } catch (e) {
        throw e;
    }
}

function parseToken(token) {
    return JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        let currentTimeStamp = Math.round(new Date().getTime() / 1000);
        if (err || currentTimeStamp > decoded.exp) {
            return false;
        }
        return decoded;
    });
}

async function verifyToken(req, res, next) {
    const token = req.headers['token'];
    if(!token) {
        return res.json({
            status: 404,
            message: 'token invalid'
        });
    }
    const tokenParse = parseToken(token);
    if(!tokenParse) {
        return res.json({
            status: 500,
            message: 'token expired!'
        })
    }

    next();
}

module.exports = {generateToken, verifyToken}