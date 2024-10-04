const { default: mongoose } = require("mongoose");

module.exports = function DbConnection(url) {
    mongoose.connect(url).then(console.log("mongodb has been connected.")).catch(err => {
        if (err) console.log(err);

    })
}