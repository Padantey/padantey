
const express =require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Load User Model
const User =require('../../models/User');

//Load Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput =  require('../../validation/login');


router.post('/signup',
(req,res)=>{ 
    const {errors, isValid} = validateRegisterInput(req.body);
//check validation
if(!isValid){
   return res.status(400).json(errors);
}


User.findOne({email: req.body.email}).then(user => {
   if(user){
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
   }else{
    //    const avatar = gravatar.url(req.body.email, {
    //       s: '200',
    //       r: 'pg',
    //       d: 'mm'
    //    });
      const newUser = new User({
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
         //avatar,
         university: req.body.university,
         collegeName: req.body.collegeName,
         faculty: req.body.faculty,
         semester: req.body.semester
      });

      bcrypt.genSalt(10, (err, salt) => {
         bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;

            newUser
               .save()
               .then(user => res.json({msg: `${user.name} added successfully.....` }))
               .catch(err => console.log(err));
            });
        });
     }
  });   
});

module.exports  = router;