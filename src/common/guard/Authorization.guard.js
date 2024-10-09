const createHttpError = require("http-errors");
const namesGlobal = require("../global/names.global");
const authMessage = require("../messages/auth.message");
const verifyToken = require("../Token/verify.token");
const userModel = require("../../modules/Users/user.model");

async function Authorization(req, res, next) {
    try {
        console.log(req.originalUrl);
        
        const { access_Token } = req.cookies;
        if (!access_Token && req.originalUrl.includes("/auth")) return next();
        else if(!access_Token) throw new createHttpError.Unauthorized(authMessage.FailLogin);
        else if(access_Token && req.originalUrl.includes("/auth")) throw new createHttpError.BadRequest(authMessage.alreadyAuthorized)
        const Token = verifyToken(access_Token);
        if (!Token) throw new createHttpError.Unauthorized(authMessage.FailLogin);
        if(Token?.id) {
        const user = await userModel.findById(Token.id, { otpCode: 0 , __v: 0 , updatedAt : 0,}).lean();
        if (!user) throw new createHttpError.Unauthorized(authMessage.FailLogin);
        req.user = user;
        return next();
        }
        throw new createHttpError.Unauthorized(authMessage.FailLogin);
    } catch (err) {
        next(err);
    }

}

module.exports = Authorization;