const { Router } = require("express");
const authController = require("./auth.controller");

const router = Router();

router.post('/send-otp',authController.SendOTP);
router.post('/check-otp',authController.checkOTP);

module.exports = {
    AuthRoutes : router
}