const { Router } = require("express");
const { AuthRoutes } = require("./src/modules/auth/auth.routes");

const mainRouter = Router();

mainRouter.use('/auth', AuthRoutes);

module.exports = {
    AllRoutes : mainRouter
}