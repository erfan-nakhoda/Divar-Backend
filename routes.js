const { Router } = require("express");
const { AuthRoutes } = require("./src/modules/auth/auth.routes");
const { UserRoutes } = require("./src/modules/Users/user.routes");
const { CategoryRoutes } = require("./src/modules/categories/category.routes");

const mainRouter = Router();

mainRouter.use('/auth', AuthRoutes);
mainRouter.use('/user', UserRoutes);
mainRouter.use("/category", CategoryRoutes)
module.exports = {
    AllRoutes : mainRouter
}