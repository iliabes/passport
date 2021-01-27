const express = require('express')
const expressLayout = require('express-ejs-layouts')
const app = express();
const ejsLint = require('ejs-lint');
const mongoose = require('mongoose');
const session = require('express-session')
const flash = require('connect-flash');

//DB Config
const db = require('./config/keys').mongoURI

// Connect to mongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log('mongoDb connected')})
    .catch(e => {console.log(e)})


//EJSь д
app.use(expressLayout)
app.set("view engine", "ejs");


//bodyparser
app.use(express.urlencoded({extended:false}))

//express-session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }))

//connect flash
app.use(flash())

//global vars
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success-msg')
    res.locals.error_msg = req.flash('error-msg')
    next()
})


//Routes
app.use('/users',require('./routes/user'))
app.use('/',require('./routes/index'))




const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`Server starting on port ${PORT}`));