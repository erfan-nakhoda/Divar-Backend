const { Router } = require("express");
const authController = require("./auth.controller");
const Authorization = require("../../common/guard/Authorization.guard");

const router = Router();

router.post('/send-otp',authController.SendOTP);
router.post('/check-otp',Authorization,authController.checkOTP);

module.exports = {
    AuthRoutes : router
}