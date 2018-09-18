// routes/auth-routes.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
// User model
const User = require("../models/user");
const Post = require("../models/post") 
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;
const ensureLogin = require("connect-ensure-login");


router.get('/post/new', (req,res,next)=>{

Post.find()
    .then((newPosts)=>{
        res.render('create-post/createPost', {post: newPosts});
    })
    .catch((err)=>{
        next(err);
    })
  
  
  })
//get the form to create post
  router.get('/createPost', (req,res,next)=>{
     res.render('create-post/createPost')

        })
     
      
      
        // , uploadCloud.single('photo')
    

router.post('/createPost', (req, res, next)=>{
  Post.create({
      title: req.body.title,
      
      imgPath: req.file.url,
      imgName: req.file.originalname,
  })
  .then((response)=>{
      res.redirect('/movies')
  })
  .catch((err)=>{
      next(err);
  })
})

module.exports = router;