const mongoose = require("mongoose");
var brimsSchema = new mongoose.Schema({
    data:{
        link:String
    }
    
});
module.exports = mongoose.model("Brims",brimsSchema);