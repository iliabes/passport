//flesh messges
//login
//ejs # -


const express = require('express')
const expressLayout = require('express-ejs-layouts')
const ejsLint = require('ejs-lint');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session')

const passport = require('passport')

const app = express();


require('./config/passport')(passport)

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

//passport init
app.use(passport.initialize());
app.use(passport.session());
  
//connect flash
app.use(flash())


//global vars
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success-msg')
    res.locals.error_msg = req.flash('error-msg')
    res.locals.error = req.flash('error')
    next()
})


//Routes
app.use('/users',require('./routes/user'))
app.use('/',require('./routes/index'))




const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`Server starting on port ${PORT}`));