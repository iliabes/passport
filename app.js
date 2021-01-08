const express = require('express')
const expressLayout = require('express-ejs-layouts')
const app = express();
const ejsLint = require('ejs-lint');
const mongoose = require('mongoose');

//DB Config
const db = require('./config/keys').mongoURI

// Connect tomongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log('mongoDb connected')})
    .catch(e => {console.log(e)})


//EJS
app.use(expressLayout)
app.set("view engine", "ejs");


//bodyparser

app.use(express.urlencoded({extended:false}))

//Routes
app.use('/users',require('./routes/user'))
app.use('/',require('./routes/index'))




const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`Server starting on port ${PORT}`));