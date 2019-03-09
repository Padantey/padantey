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
    required: true
},
description: {
    type: String,
    required: true
}

});

module.exports = Note = mongoose.model('note',NoteSchema)