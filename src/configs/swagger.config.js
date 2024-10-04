const path = require('path');
const jsdoc = require('swagger-jsdoc');
const uiExpress = require('swagger-ui-express');

module.exports = function swaggerConfig(app) {
    const document = jsdoc({
        openapi: "3.0.1",
        swaggerDefinition: {
            info: {
                title: "Divar-Backend",
                description: "this is backend divar project.",
                version: "1.0.0"
            },
        },
        apis: ["../modules/**.swagger.js"]
    })

    const uiConfig = uiExpress.setup(document)
    app.use('/swagger', uiExpress.serve, uiConfig)
}