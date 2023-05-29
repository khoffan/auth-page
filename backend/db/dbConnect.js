const mongoose = require('mongoose');
require('dotenv').config()
async function dbConnect() {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
    }).then(() => {
        console.log('connect database successfully');
    }).catch((e) => {
        console.log('connect database is fail');
        console.error(e);
    })
}

module.exports = dbConnect