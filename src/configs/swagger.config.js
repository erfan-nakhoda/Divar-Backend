const path = require('path');
const jsdoc = require('swagger-jsdoc');
const uiExpress = require('swagger-ui-express');

module.exports = function swaggerConfig(app) {
    const document = jsdoc({
        swaggerDefinition: {
            openapi : "3.0.0",
            info: {
                title: "Divar-Backend",
                description: "this is backend divar project.",
                version: "1.0.0"
            },
        },
        apis: [process.cwd() + "/src/modules/**/*.swagger.js"]
    })

    const uiConfig = uiExpress.setup(document)
    app.use('/swagger', uiExpress.serve, uiConfig)
}