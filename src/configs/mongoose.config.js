const { default: mongoose } = require("mongoose");
function DbConnection() {
    mongoose.connect(process.env.DB_URL).then(console.log("mongodb has been connected.")).catch(err => {
        if (err) console.log(err);

    })
}
DbConnection()