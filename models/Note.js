const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const NoteSchema = new Schema({
name : {
    type: String,
    required:true
},
author: {
    type: String
},
code: {
    type: String,
    required: true,
},
price: {
    type: Number,
    required: true
},
page: {
    type: Number,
    required:true
},
quality: {
    type: String,
    default: 'Better'
},
description: {
    type: String,
    required: true
},
subject: [
       {type:String, ref:'subject'},
],
user: {
    type: Schema.Types.ObjectId,
    ref: "user"
},
date : {
    type: Date,
    default: Date.now
}

});

module.exports = Note = mongoose.model('notes',NoteSchema)