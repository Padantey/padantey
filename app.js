
//Core Node Module
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
//Imported Modules
const users = require('./routes/api/users');
const books = require('./routes/api/books');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//DB config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
    .connect(db,{useNewUrlParser:true})
    .then(() => console.log('MongoDb Connected'))
    .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

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
