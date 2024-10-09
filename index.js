const express = require('express');
const { err404Handler, allErrHandler } = require('./src/common/ErrHandlers/errHandler');
const swaggerConfig = require('./src/configs/swagger.config');
const { AllRoutes } = require('./routes');
const cookieParser = require('cookie-parser');
const namesGlobal = require('./src/common/global/names.global');
require("dotenv").config();
function main() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended : true}));
    require("./src/configs/mongoose.config");
    swaggerConfig(app);
    app.use(cookieParser(process.env.Secret_Key, {
        httpOnly : true,
        secure : process.env.Node_Env === namesGlobal.Node_Env.production
    }))
    app.use(AllRoutes)
    app.use(err404Handler);
    app.use(allErrHandler);
    app.listen(process.env.PORT, (err) => {
        err ? console.log(err) : console.log(`http://localhost:${process.env.PORT}`);
    });
}
main();