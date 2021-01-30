const express = require('express');
const router = express.Router();
const { ensureAuthefication } = require('../config/auth');


router.use('/dashboard', ensureAuthefication ,(req,res) => {
    console.log('req.user'+req.user)
    res.render('dashbord',{
        name: req.user.name
    });
})

//login
router.use('/',(req,res) => {
    res.render('welcome');
})





module.exports = router;