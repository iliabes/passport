const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs')



//login
router.use('/login',(req,res) => {
    res.render('login');
})


router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }
  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
      User.findOne({email : email})
      .then( user => {
        if(user){
          errors.push({msg: 'Emai is alredy registered'});
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          });
        }else{
          const newUser = User({
            name:name,
            email:email,
            password:password
          })
        }
      })
  }
  console.log(errors)
});

//register
router.get('/register',(req,res) => {
    console.log('reg')
    res.render('register');
})

//register Handle


module.exports = router;