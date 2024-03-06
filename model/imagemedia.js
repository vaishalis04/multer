const mongoose = require("mongoose")

const image = new mongoose.Schema({
    username: String,
    fileupload: String
})

module.exports = mongoose.model("images",image )