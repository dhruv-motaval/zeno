const mongoose = require("mongoose");
var leaderboardsSchema = new mongoose.Schema({
    data: {
        leaderboardRank:String,
        gameName:{
            required:true,
            type:String
        },  
        numberOfWins:String,
        rankedRating:String

    }
   
});
module.exports = mongoose.model("Leaderboards",leaderboardsSchema);