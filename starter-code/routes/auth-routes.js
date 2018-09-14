// routes/auth-routes.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
// User model
const User = require("../models/user");

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;
const ensureLogin = require("connect-ensure-login");


router.get("/signup", (req, res, next) => {
    res.render("auth/signup");
  });
  

  router.post("/signup", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    if (username === "" || password === "") {
      res.render("auth/signup", { message: "Indicate username and password" });
      return;
    }
    User.findOne({ username })
    .then(user => {

      if (user !== null) {
        res.render("auth/signup", { message: "The username already exists" });
        return;
      } 
       const salt = bcrypt.genSaltSync(bcryptSalt);
       const hashPass = bcrypt.hashSync(password, salt);
  
      const newUser = new User({
        username: username,
        email: email,
        password: hashPass,
      });
  
      newUser.save((err) => {
  
        if (err) {
          res.render("auth/signup", { message: "Something went wrong" });
        } else {

          res.render("/");
        }
      });
    })
    .catch(error => {
      next(error)
    })
  });


  router.get("/login", (req, res, next) => {
    res.render("auth/login");
  });
  
  router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  }));
  
  router.get("/login", (req, res, next) => {
    res.render("auth/login", { "message": req.flash("error") });
  });

  router.get("/private", ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render("private", { user: req.user });
  });

  router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
  });


  module.exports = router;