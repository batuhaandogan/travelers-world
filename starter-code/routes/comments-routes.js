// routes/auth-routes.js
const express = require("express");
const router = express.Router();
const Comments = require ('../models/comments.js')
const Post = require('../models/post');






router.get('/createComment', (req, res, next) => {
    res.render('private')
  });




     
router.post('/createComment/:id',  (req, res, next)=>{

    Comments.create({
        content: req.body.content,
        post: req.params.id
    })
      .then((response)=>{
          console.log("this is the comment=-=-=-=-=-=-=-=-=-=-=-=-=-=",response)
          Post.findByIdAndUpdate(req.params.id, {$push: {comments: response._id}})
          .then((blah)=>{
              res.redirect('/private')

          })
        // res.render('afterlogin/after-login',{thePost :response})
      })
      .catch((err)=>{
          console.log('error error error error error error error ',err)
          next(err);
      })
    })
    



  
module.exports = router;