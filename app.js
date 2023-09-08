require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const User = require("./models/User");
const Brim = require("./models/brim");
const Account = require("./models/account");
const bcrypt = require("bcryptjs");
const path = require('path');
const ValorantAPI = require("unofficial-valorant-api");
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("./middlewares/auth");

 const app = express();
 const bodyParser = require("body-parser");
 const Setting = require("./models/setting");
 const Leaderboard = require("./models/leaderboard");
 const Home = require("./models/home");

 mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/valorant");
var db=mongoose.connection;

db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(express.static("public"));

// Static Middleware
app.use(express.static(path.join(__dirname, 'public')))
  
//Show home 
app.get("/", (_req, res) => {
    Home.find({}, (err, homes) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("index", { homes: homes });
        }
    });

})

//Show weapons 
app.get("/weapons", (_req, res) => {
  
          res.render("public/weapons/weapons");
      }
 )

//show classic in weapons
app.get('/weapons/classic', function(req, res){
  res.render('public/weapons/classic')
})

//show operator in weapons
app.get('/weapons/operator', function(req, res){
  res.render('public/weapons/op')
})
 
//show phantom in weapons
app.get('/weapons/phantom', function(req, res){
  res.render('public/weapons/phantom')
})

//show vandal in weapons
app.get('/weapons/vandal', function(req, res){
  res.render('public/weapons/vandal')
})

//show guides
app.get('/guides', function(req, res){
  res.render('public/guides/guides')
})

//show  brim in guides
app.get("/guides/brimstone", (req, res) => {
  Brim.find({}, (err, brims) => {
      if (err) {
          console.log(err);
      }
      else {
          res.render("public/guides/brimlineup", {brims: brims });
      }
  });

})

//Show agents 

app.get("/agents", (_req, res) => {
  Home.find({}, (err, homes) => {
      if (err) {
          console.log(err);
      }
      else {
          res.render("public/agents/agents", { homes: homes });
      }
  });

})

 
//show jett in agents
app.get('/agents/jett', function(req, res){
  res.render('public/agents/jett')
})

//show sage in agents
app.get('/agents/sage', function(req, res){
  res.render('public/agents/sage')
})

//show sova in agents
app.get('/agents/sova', function(req, res){
  res.render('public/agents/sova')
})

//show brimstone in agents
app.get('/agents/brimstone', function(req, res){
  res.render('public/agents/brim')
})
 

//Show maps

app.get("/maps", (_req, res) => {
  Home.find({}, (err, homes) => {
      if (err) {
          console.log(err);
      }
      else {
          res.render("public/maps/maps", { homes: homes });
      }
  });

})

//show ascent in maps
app.get('/maps/ascent', function(req, res){
  res.render('public/maps/ascent')
})

//show bind in maps
app.get('/maps/bind', function(req, res){
  res.render('public/maps/bind')
})

//show breeze in maps
app.get('/maps/breeze', function(req, res){
  res.render('public/maps/breeze')
})

//show icebox in maps
app.get('/maps/icebox', function(req, res){
  res.render('public/maps/icebox')
})

//authentication

const initializePassport = require("./passport-config");
initializePassport(
  passport,
  async (name) => {
    const userFound = await User.findOne({ name });
    return userFound;
  },
  async (id) => {
    const userFound = await User.findOne({ _id: id });
    return userFound;
  }
);

app.get("/admin", (_req, res) => {
  User.find({}, (err, users) => {
      if (err) {
          console.log(err);
      }
      else {
          res.render("admin", { users: users });
      }
  });

})

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("admin/auth/register");
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("admin/auth/login");
});

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "admin",
    failureRedirect: "/login",
    failureFlash: true
  })
);

app.post("/register", checkNotAuthenticated, async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email });

  if (userFound) {
    req.flash("error", "User with that email already exists");
    res.redirect("/register");
  } else {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      });

      await user.save();
      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.redirect("/register");
    }
  }
});

app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});
//Show settings (admin) 
app.get("/admin/setting", (_req, res) => {
    Setting.find({}, (err, settings) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("admin/setting/setting", { settings: settings });
        }
    });
})




//Add new setting (admin) 
app.post("/add",(req,res)=>{
var name = req.body.name;
var team = req.body.team;
var mouse = req.body.mouse;
var dpi = req.body.dpi;
var sensitivity = req.body.sensitivity;
var edpi = req.body.edpi;
var monitor = req.body.monitor;
var refresh = req.body.refresh;
var hz = req.body.hz;
var ads = req.body.ads;
var gpu = req.body.gpu;
var resolution = req.body.resolution;
var mousepad = req.body.mousepad;
var keyboard = req.body.keyboard;
var headset = req.body.headset


var newSetting = {
    name:name,
    team:team,
    mouse:mouse,
    hz:hz,
    dpi:dpi,
    sensitivity:sensitivity,
    edpi:edpi,
    ads:ads,
    monitor:monitor,
    refresh:refresh,
    gpu:gpu,
    resolution:resolution,
    mousepad:mousepad,
    keyboard:keyboard,
    headset:headset
};

Setting.create(newSetting,(err,data)=>{
  if(err){
      console.log(err);
  }else {
      console.log(data);
      res.redirect("/admin/setting");
  }
})
})

//Get EditForm (admin) 
app.get("/:id/edit",(req,res)=>{
  Setting.findById(req.params.id,function (err, setting){
      if(err){
          console.log(err);
          res.redirect("/admin/setting");
      }else{
          res.render("admin/setting/edit",{setting: setting});
      }
  })
  })
  //Edit Put request  (admin) 
  app.put("/:id/edit",(req, res)=>{
  Setting.findByIdAndUpdate(req.params.id,req.body.setting,(err, _updatedata) => {
          if (err) {
              console.log(err);
              res.redirect("/admin/setting");
          } else {
              res.redirect("/admin/setting");
          }
      })
  })
  //Delete setting (admin)
  app.delete("/:id",(req,res)=>{
  Setting.findByIdAndRemove(req.params.id,function (err){
      if(err){
          console.log(err);
          res.redirect("/admin/setting");
      }else {
          res.redirect("/admin/setting");
          }
  })
  })
  
  //Show setting (public) 
  app.get("/setting", (_req, res) => {
      Setting.find({}, (err, settings) => {
          if (err) {
              console.log(err);
          }
          else {
              res.render("public/pro-settings/setting", { settings: settings });
          }
      });
  
  })


//add temp player

var player = {
  "name": "ANTony",
  "tag": "NOOB"
};

db.collection("details").insertOne(player, function(err, res) {
  if (err) throw err;
  console.log("1 document inserted");
});

app.post('/sign_up', function(req,res){
	var name = req.body.name;
	var tag =req.body.tag;
	

	var data = {
		"name": name,
		"tag":tag
	}
 
db.collection('details').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
		
	return res.redirect('/player');
})

  db.collection("leaderboards").deleteMany(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
   
  });

  async function fetchLeaderboard(region) {
    const leaderboard = await ValorantAPI.getLeaderboard(region)
  
    db.collection("leaderboards").insertOne(leaderboard, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      
    });
  }
  fetchLeaderboard("ap")

 
  db.collection("accounts").deleteMany(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
   
  });
    
  db.collection("details").findOne({}, function(err, result) {
      if (err) throw err;
      async function fetchAccount(name, tag) {
        const account = await ValorantAPI.getAccount(name, tag)
        console.log(account)
  db.collection("accounts").insertOne(account, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");    
     });
    }
    gamerName = result.name; 
    gamerTag = result.tag;
   
    fetchAccount(gamerName, gamerTag) 

    async function fetchMMR(version, region, name, tag) {
        const mmr = await ValorantAPI.getMMR(version, region, name, tag)
        console.log(mmr)
        db.collection("accounts").insertOne(mmr, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");

      });
      
    }
    gamerName = result.name; 
    gamerTag = result.tag;
    
    fetchMMR("v1", "ap", gamerName, gamerTag) 

});

//delete previous brim lineups
db.collection("brims").deleteMany(function(err, delOK) {
  if (err) throw err;
  if (delOK) console.log("Collection deleted");
 
});

//insert data for brim lineups
var brim = {"agentName": "brimstone",
"data": [
  {
    "link": "https://www.youtube.com/embed/QpbI78-1BwU"
  },
  {
    "link": "https://www.youtube.com/embed/LwSbqTE0k-A"
  },
  {
    "link": "https://www.youtube.com/embed/XltwixNp7e4"
  },
  {
    "link": "https://www.youtube.com/embed/LwSbqTE0k-A"
  }
]}

db.collection("brims").insertOne(brim, function(err, res) {
  if (err) throw err;
  console.log("1 document inserted");

});


//Show search player 
app.get("/player", (req, res) => {
  
  res.render("public/player/player");
} 
);
 
//Show account 
app.get("/account", (req, res) => {
  
  Account.find({card:true}, (err, accounts) => {
      if (err) {
          console.log(err);
      }
      else {
          res.render("public/account/account", { accounts: accounts });
      }

  });
})

//delete previous player details
db.collection("details").deleteMany(function(err, delOK) {
  if (err) throw err;
  if (delOK) console.log("Collection deleted");
 
});


//Show leaderboard 


app.get("/leaderboard", (req, res) => {
  Leaderboard.find({}, (err, leaderboards) => {
      if (err) {
          console.log(err);
      }
      else {
          res.render("public/leaderboard/leaderboard", { leaderboards: leaderboards });
      }
  });

})
//server

app.listen(4000,(err)=>{
    if(err){
        console.log(err);
    }else {
        console.log("Server Started At PORT 4000");
    }
})