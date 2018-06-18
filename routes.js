var express = require("express");
var Zombie = require("./models/zombie");

var passport = require("passport");

var router = express.Router();

router.use((req, res, next) => {
    res.locals.currentZombie = req.zombie;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

router.get("/",(req, res, next) => {
    Zombie.find()
    .sort({ createdAt: "descending" })
    .exec((err, zombies) => {
        if(err){
            return next(err);
        }
        res.render("index",{ zombies:zombies });
    });
});


router.get("/zombies/:username",(req, res, next) => {
    Zombie.findOne({ username: req.params.username}, (err,zombie) =>{
        if(err){
            return next(err);
        }
        if (!zombie){
            return next (404);

        }
        res.render("profile",{zombie: zombie});
    });
});


router.get("/signup", (req,res) => {
    res.render("signup");
});

router.post("/signup", (req,res,next) => {
    var username = req.body.username;
    var password = req.body.password;

    Zombie.findOne({ username: username}, (err,zombie) => {
        if(err){
            return next(err);
        }
        if(zombie){
            req.flash("error", "El nombre de usuario ya ha sido tomado por otro zombie");
            return res.redirect("/signup");
        }
        var newZombie = new Zombie({
            username: username,
            password: password
        });


        newZombie.save(next);
        return res.redirect("/");
    });
});

module.exports = router;
