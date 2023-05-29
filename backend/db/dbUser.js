const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required:[true, 'Please provide to email'],
        unique:[true, "Email Exit"]
    },
    password: {
        type: String,
        required: [true, "PLease provide a password"],
        unique: false
    },
})

module.exports = mongoose.model.Users || mongoose.model("Users", userSchema);
