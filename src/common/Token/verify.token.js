const jwt = require("jsonwebtoken")

module.exports = function TokenVerifier(Token) {
    const result = jwt.verify(Token , process.env.Secret_Key);
    return result;
}