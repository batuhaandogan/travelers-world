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
Post.create({
    content: req.body.content,
    imgPath: req.file.url,
    owner: req.user._id
})
  .then((response)=>{
      console.log("this is the response=-=-=-=-=-=-=-=-=-=-=-=-=-=",response)
      res.redirect('/private')
    // res.render('afterlogin/after-login',{thePost :response})
  })
  .catch((err)=>{
      console.log('error error error error error error error ',err)
      next(err);
  })
})


router.post('/post/delete/:id', (req, res, next)=>{

    Post.findByIdAndRemove(req.params.id)
    .then((response)=>{
        res.redirect('/private')
    })
    .catch((err)=>{
        next(err)
    })

})




module.exports = router;