const express = require('express');
require("dotenv").config();
function main() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended : true}));
    app.listen(process.env.PORT, (err) => {
        err ? console.log(err) : console.log(`http://localhost:${process.env.PORT}`);
    });
}
main();