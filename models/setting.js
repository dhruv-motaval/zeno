const mongoose = require("mongoose");
var settingsSchema = new mongoose.Schema({
    name:String,
    team:String,
    mouse:String,
    hz:String,
    dpi:String,
    sensitivity:String,
    edpi:String,
    ads:String,
    monitor:String,
    refresh:String,
    gpu:String,
    resolution:String,
    mousepad:String,
    keyboard:String,
    headset:String
    
});
module.exports = mongoose.model("Settings",settingsSchema);