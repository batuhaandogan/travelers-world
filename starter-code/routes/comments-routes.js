// routes/auth-routes.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
// User model
const User = require("../models/user");

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;
const ensureLogin = require("connect-ensure-login");



module.exports = router;