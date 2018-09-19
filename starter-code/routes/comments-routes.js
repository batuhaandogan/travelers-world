// routes/auth-routes.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
// User model
const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;
const ensureLogin = require("connect-ensure-login");

router.get('/private', (req, res, next)=>{
    res.render('private');
})
    

module.exports = router;