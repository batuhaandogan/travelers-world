const express = require('express');
const router  = express.Router();
const  Profile  = require('../models/profiles')



router.get('/profiles/edit/:profileid', (req, res, next)=>{
    Celebrity.findById(req.params.profileid)
    .then((theProfile)=>{
        res.render('editProfile', {profile: theProfile});
    })
    .catch((err)=>{
        next(err);
    })
})


router.post('/profiles/update/:id', (req, res, next)=>{
 
 
 
    Celebrity.findByIdAndUpdate(req.params.id, {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
    })
    .then((response)=>{
        res.redirect('/profiles/'+req.params.id)
    })
    .catch((err)=>{
       next(err);
    })

    console.log('body:', req.body)

})




    // router.get('/profiles/new', (req,res,next)=>{
    //     res.render('newCharacter');
    // })


    // router.post('/newCharacter', (req, res, next)=>{
    //     Celebrity.create({
    //         name: req.body.name,
    //         occupation: req.body.occupation,
    //         catchPhrase: req.body.catchPhrase
    //     })
    //     .then((response)=>{
    //         res.redirect('/celebrities')
    //     })
    //     .catch((err)=>{
    //         next(err);
    //     })
    // })