const autoBind = require("auto-bind");
 
const createHttpError = require("http-errors");
const namesGlobal = require("../../common/global/names.global");
const authMessage = require("../../common/messages/auth.message");

class UserController {
    constructor() {
        autoBind(this);
    }
    async whoami(req,res,next) {
        try {
            return res.status(200).send(req.user)
        } catch (err) {
            next(err)
        }
    }

    LogOut(req,res,next) {
        try {
            res.clearCookie(namesGlobal.accessToken);
            return res.send({
                status : 200,
                message : authMessage.SuccessLogOut
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new UserController();