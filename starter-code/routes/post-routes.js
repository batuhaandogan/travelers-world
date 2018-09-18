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
const uploadCloud = require('../config/cloudinary.js');


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
     
      
      
router.post('/createPost', uploadCloud.single('photo'), (req, res, next)=>{
    const { content } = req.body;
    const imgPath = req.file.url;
    const imgName = req.file.originalname;
    const newPost = new Post({content, imgPath, imgName})
newPost.save()
  .then((response)=>{
      console.log("this is the response=-=-=-=-=-=-=-=-=-=-=-=-=-=",response)
      res.render('afterlogin/after-login')
  })
  .catch((err)=>{
      console.log('error error error error error error error ',err)
      next(err);
  })
})

module.exports = router;