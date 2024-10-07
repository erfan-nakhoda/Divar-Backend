const createHttpError = require("http-errors");
const authMessage = require("../../common/messages/auth.message");
const autoBind = require("auto-bind");
const AuthService = require("./auth.sevice");
const namesGlobal = require("../../common/global/names.global");
const TokenMaker = require('../../common/Token/create.token')

class AuthController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = AuthService
    }
    async SendOTP(req,res,next){
        try {
            const {number} = req.body;
            if(!number) throw new createHttpError.BadRequest(authMessage.invalidInput);
            const result = await this.#service.sendOTP(number);
            return res.send({
                status : 200,
                message : result
            })
        } catch (err) {
            next(err)
        }
    }
    async checkOTP(req,res,next){
        try {
            const {number, code} = req.body;
            if(!number || !code) throw new createHttpError.BadRequest(authMessage.invalidInput)
            const result = await this.#service.checkOTP(number,code);
            res.cookie(namesGlobal.accessToken, TokenMaker(result.data, "1d"))
            return res.send({
                status : result.status,
                message : result.message
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new AuthController();