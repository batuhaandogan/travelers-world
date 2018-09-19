// routes/auth-routes.js
const express = require("express");
const router = express.Router();
const Comments = require ('../models/comments.js')






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
          
          res.redirect('/private')
        // res.render('afterlogin/after-login',{thePost :response})
      })
      .catch((err)=>{
          console.log('error error error error error error error ',err)
          next(err);
      })
    })
    





// router.get('/private', (req, res, next)=>{
//     res.render('private');
// })


// router.get('/comments', (req, res, next) => {
    
//     Comments.find()
//     console.log(Comments)
//     .then((listOfComments)=>{
//         console.log(listOfComments)
//         // res.json(listOfComments)
//     })
//     .catch((err)=>{
//         res.json(err);
//     })
// });


// router.get('/fancypage', (req, res, next)=>{
//     res.render('fancy');
// })


// router.get('/comments', (req, res, next) => {
//     Comments.find()
//     .then((response)=>{
// console.log(response)
//         // res.json(response)

//     })
//     .catch((err)=>{
//         console.log(err)
//         // res.json(err);
//     })
// });




// router.post('/api/comments/create', (req, res, next)=>{

//     Comment.create({
//         star: String,
//         content: String,
//     })
//     .then((response)=>{
//         res.json('/private')
//     })
//     .catch((err)=>{
//         req.json(err);
//     })

// });


// router.get('/comments/add', (req, res, next) => {
//     res.render('private')
//   });

// router.post('/comments/add',  (req, res, next) => {
//         const content = req.body.content;
//         const star = req.body.star;
//     Comments.create({content: content, star: star, })
//     .then(response => {
//         console.log(response)
//       res.redirect('/private')
//     })
//     .catch(error => {
//       console.log(error)
//     })
//   });

  
module.exports = router;