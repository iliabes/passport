const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport');
const User = require('../models/User');




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
    console.log('erooeows'+errors[0].msg)
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
      console.log('else'+name,email)
      User.findOne({email : email})
        .then( user => {
          console.log('mongouser'+user)
           if(user){
            console.log(user)
             errors.push({msg: 'Emai is alredy registered'});
             res.render('register', {
              errors,
              name,
              email,
              password,
              password2
          });
        }else{
          console.log('asd')
          const newUser = User({
            name,
            email,
            password
          })

          bcrypt.genSalt(10,(err,salt)=>{
            if(err) throw err;
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
              newUser.password = hash;
              console.log(newUser)
              newUser.save()
                .then(user => {
                  req.flash('success_msg',"you are registered")
                  res.redirect('/users/login')
                })
                .catch(err => console.log(err))
            })
          })
        }
      })
  }
  console.log('errors'+errors)
});

//register
router.get('/register',(req,res) => {
    console.log('reg')
    res.render('register');
})

//register Handle


module.exports = router;