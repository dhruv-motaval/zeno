const mongoose = require("mongoose");
var accountsSchema = new mongoose.Schema({
    data:{
        region:String,
        name:String,
        tag:String,
        card:{
                large:String
        },
        currenttierpatched: String,
         elo: String
       
    }     
});
module.exports = mongoose.model("Accounts", accountsSchema);
