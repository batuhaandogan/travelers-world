// routes/auth-routes.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
// User model
const User = require("../models/user");

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;
const ensureLogin = require("connect-ensure-login");
const Post = require("../models/post") 
const Comments = require("../models/comments") 
const uploadCloud = require('../config/cloudinary.js');







router.get("/signup", (req, res, next) => {
    res.render("auth/signup");
  });
  

  router.post("/signup", uploadCloud.single('photo'), (req, res, next) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    // const image: req.file.url,
    // const imgPath: req.file.originalname,
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
  
        User.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            imgPath: req.file.url,
            password: hashPass
        })
        .then((response)=>{
          res.redirect("/");
        })
        .catch((err)=>{
          res.render("auth/signup", { message: req.flash("error") });
        })
      })
      .catch(error => {
        next(error)
      })
  });  




 


  router.get('/private' , ensureLogin.ensureLoggedIn('/login'),(req, res, next)=>{
    // console.log(req.user);
    Post.find({owner:req.user._id})
    .then((thePostsIGet)=>{
      // var random = Math.floor(Math.random() * thePostsIGet.length);
      console.log("id of the posts ------------------------ ", thePostsIGet[0]._id)
      Comments.find({post: thePostsIGet[0]._id}).populate('post')
      .then((theCommentIGet)=>{
        console.log("THE COMMENTS=-=-=-=-=-=-=-=-=-=", theCommentIGet)
        res.render('afterlogin/after-login', {message: req.flash('success'), theUser: req.user, thePosts: thePostsIGet[0], theComments: theCommentIGet })
      })
      .catch((err)=>{
        next(err)
      })
    })
    .catch((err)=>{
      next(err)
    })
  })
  
  router.post("/login", passport.authenticate("local", {
    successRedirect: "/private",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  }));



  router.get('/profiles/edit/:profileid', (req, res, next)=>{
    User.findById(req.params.profileid)
    .then((theProfile)=>{
        res.render('afterlogin/editProfile', {profile: theProfile});
    })
    .catch((err)=>{
        next(err);
    })
})


router.post('/profiles/edit/:id', (req, res, next)=>{
  console.log('========req.body = = = == = == = =', req.body)

const updates = {
  firstname: req.body.firstname,
  lastname: req.body.lastname,
  email: req.body.email,
}
if(req.file){
  updates.imgPath = req.body.url
}

console.log('updates: ', updates)

     User.findByIdAndUpdate(req.params.id, updates)
     .then((response)=>{
         res.redirect('/private')
     })
     .catch((err)=>{
        next(err);
     }) 
 })

 router.get('/editContact' , ensureLogin.ensureLoggedIn('/login'),(req, res, next)=>{
  console.log(req.user);
  res.render('afterlogin/editContact', {message: req.flash('success'), theContacter: req.user})
})

//update the user GET
 router.get('/contact/edit/:contactid', (req, res, next)=>{
  User.findById(req.params.profileid)
  .then((theContact)=>{
      res.render('afterlogin/editContact', {contact: theContact});
  })
  .catch((err)=>{
      next(err);
  })
})

//update the user POST
router.post('/contact/edit/:id', (req, res, next)=>{
   User.findByIdAndUpdate(req.params.id, {
       contact: req.body.contact,
       date: req.body.birthday,
       address: req.body.address,
   })
   .then((response)=>{
       res.redirect('/editContact')
   })
   .catch((err)=>{
      next(err);
   })

   console.log('body:', req.body)

})






  
  router.get("/login", (req, res, next) => {
    res.render("auth/login", { message: req.flash("error") });
  });

  router.get("/private", ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render("afterlogin/after-login", { user: req.user });
  });

  router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });


  module.exports = router;