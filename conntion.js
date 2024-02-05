const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/User_Files", {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {console.log("connection sucessfull.....")})
.catch((e) => {console.log(e)});