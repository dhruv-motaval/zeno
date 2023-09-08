const mongoose = require("mongoose");
var homesSchema = new mongoose.Schema({
    current:String,
    about:String,
    weapons:String,
    setting:String,
    maps:String,
    agents:String,
    weaponMain:String,
    operator:String,
    phantom:String,
    vandal:String,
    classic:String,
    agentMain:String,
    jett:String,
    sage:String,
    sova:String,
    brimstone:String,
    agentMain2:String,
    mapsMain1:String,
    mapsMain2:String,
    mapsMain3:String
    
});
module.exports = mongoose.model("Homes",homesSchema);