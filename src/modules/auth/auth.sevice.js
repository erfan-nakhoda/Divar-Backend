const userModel = require("../Users/user.model");
const autoBind = require('auto-bind');
const crypto = require('crypto');
const createHttpError = require("http-errors");
const authMessage = require("../../common/messages/auth.message");

class AuthService {
    #DB;
    constructor() {
        autoBind(this)
        this.#DB = userModel;
    }
    async sendOTP(number) {
        const user = await this.#DB.findOne({number});
        if(!user) {
            const otpCode = {
                code : crypto.randomInt(10000, 99999),
                expiresIn : Date.now() + (1000 * 60 * 2)
            }
            await this.#DB.create({
                otpCode,number, verifiedNum : false
            })
            return authMessage.SuccessOTP;
        }
        if(user.otpCode && user.otpCode.expiresIn > Date.now()) throw new createHttpError.BadRequest(authMessage.OTPNotExpired);
        user.otpCode.code = crypto.randomInt(10000, 99999);
        user.otpCode.expiresIn = Date.now() + (1000 * 60 * 2);
        await user.save();
        return authMessage.SuccessOTP
    }
    async checkOTP(number, otpCode) {
        
        const user = await this.checkUserExistenceByNum(number);
        if(!user.otpCode || user.otpCode.expiresIn <= Date.now()) throw new createHttpError.BadRequest(authMessage.OTPExpired);
        if(user.otpCode.code != otpCode) throw new createHttpError.BadRequest(authMessage.InvalidOTP);
        user.verifiedNum = true;
        await user.save();
        return {message : authMessage.SuccessLogin, status : 200, data : {id : user.id}}
    }
    async checkUserExistenceByNum(number) {
        const user = await this.#DB.findOne({number});
        if(!user) throw new createHttpError.NotFound(authMessage.NotFound);
        return user;
    }

}

module.exports = new AuthService();