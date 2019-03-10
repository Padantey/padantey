
const express =require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//Load User Model
const User =require('../../models/User');

//Load secret key
const keys = require('../../config/keys');

//Load Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput =  require('../../validation/login');


// @route Post api/users/signup
// @desc User Signup
// @access Public
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
        const avatar = gravatar.url(req.body.email, {
           s: '200',
           r: 'pg',
           d: 'mm'
       });
      const newUser = new User({
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
         avatar,
         contact: req.body.contact,
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

// @route Post api/users/signin
// @desc User Login / Return JWT token
// @access Protected

router.post('/signin',(req,res)=>{
   const {errors, isValid} = validateLoginInput(req.body);
//check validation
if(!isValid){
   return res.status(400).json(errors);
}

const email  = req.body.email;
const password =req.body.password;

   //Find user by email
   User.findOne({email})
      .then(user=>{
         //Check if a user exists
         if(!user){
            errors.email = 'User Not Found'
            return res.status(404).json(errors);
         }
         //Check the passwords
         bcrypt.compare(password, user.password)
            .then( isMatch => {
               if(isMatch){
                  //Only when user matched

                  const payload = {
                     id: user.id,
                     name: user.name,
                     avatar: user.avatar
                  }

                  //Sign Token
                  jwt.sign(
                     payload,
                     keys.secretOrKey, 
                     {expiresIn: 3600}, 
                     (err,token)=>{
                        res.json({
                           success : true,
                           token: `Bearer ${token}`
                        })
                  });
               } else {
                  errors.password = 'Incorrect Password';
                  res.status(400).json(errors);
               }
            } )

      })
      .catch(err => console.log(err));
})

// @route GET api/users/current
// @desc Return current user
// @access Protected

router.get('/current',passport.authenticate('jwt',{session :false}), (req,res)=>{
   res.json({
      name: req.body.name,
         email: req.body.email,
         avatar,
         contactNo: req.body.contactNo,
         university: req.body.university,
         collegeName: req.body.collegeName,
         faculty: req.body.faculty,
         semester: req.body.semester
   });
})




module.exports  = router;