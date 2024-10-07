const jwt = require("jsonwebtoken");
module.exports = function TokenMaker(payload, expire) {
    const Token = jwt.sign(payload,process.env.Secret_Key, {
        expiresIn : expire
    })
    return Token
}