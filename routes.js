const { Router } = require("express");
const { AuthRoutes } = require("./src/modules/auth/auth.routes");
const { UserRoutes } = require("./src/modules/Users/user.routes");

const mainRouter = Router();

mainRouter.use('/auth', AuthRoutes);
mainRouter.use('/user', UserRoutes)
module.exports = {
    AllRoutes : mainRouter
}