const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/imagemedia")
.then(()=> console.log("db connecetd"))
.catch((err)=> console.log(err))