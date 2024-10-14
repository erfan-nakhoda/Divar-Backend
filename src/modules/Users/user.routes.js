const { Router } = require("express");
const userController = require("./user.controller");
const Authorization = require("../../common/guard/Authorization.guard");
 
const router = Router();

router.get('/whoami', Authorization,userController.whoami);
router.get('/logout', Authorization, userController.LogOut);

module.exports = {
    UserRoutes : router
}