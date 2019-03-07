'use strict';

//Core Node Module
const express = require('express');
const mongoose = require('mongoose');

//Imported Modules
const users = require('./routes/api/users');
const books = require('./routes/api/books');

const app = express();

//DB config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
    .connect(db,{useNewUrlParser:true})
    .then(() => console.log('MongoDb Connected'))
    .catch(err => console.log(err));

//Use Routes
app.use('/api/users',users);
app.use('/api/books', books);

app.get('/',(req,res)=>{
    res.send('Hello');
})    
const PORT = process.env.PORT || 3000;
app.listen(PORT,
    ()=> console.log(`App is running on port ${PORT}`)
    );
