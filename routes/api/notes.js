
const express =require('express');
const router = express.Router();
const passport = require('passport');

//Load User Model
const User = require('../../models/User');
//Load Note Model
const Note = require('../../models/Note');

//Load Validation
const validateNoteRegistration = require('../../validation/notes');

// @route POST api/users/add-note
// @desc Add Note By the Current User
// @access Protected
router.post(
    '/add-note',
    passport.authenticate('jwt',{session: false}),
     (req,res)=>{
        const {errors,isValid}= validateNoteRegistration(req.body);
        //check Validity
        if(!isValid){
            return res.status(400).json(errors);}  
        const newNote = new Note({
            name: req.body.name,
            author: req.body.author,
            price: req.body.price,
            page: req.body.page,
            quality: req.body.quality,
            user: req.user.id,
            description: req.body.description,
            subject: req.body.subject,
            code: req.body.code,
        });
        newNote.save()
            .then(note => res.json(note))
            .catch(err=>console.log(err));
        }
);

router.get('/dashboard',/*
passport.authenticate('jwt',{session: false}),*/(req,res) => {
    let dashboardData = {
    };
     dashboardData.hell = "ell";
    Note.find()
    .then(notes => {
        res.json(dashboardHelper(notes));
    }).catch(e=> console.log(e));

    

 });

 const dashboardHelper = (allNotes) => {
    const ct101 = allNotes.filter(note => note.code === 'ct101');
    const ct102 = allNotes.filter(note => note.code === 'ct102');
    return {ct101, ct102}
 };


module.exports  = router;
