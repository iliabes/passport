const express = require('express');
const router = express.Router();




//login
router.use('/login',(req,res) => {
    res.render('login');
})



//register
router.get('/register',(req,res) => {
    console.log('reg')
    res.render('register');
})

//register Handle
router.post('/register',(req,res) => {
    const { name , emeil, password, password2} = req.body
    console.log(name)
})


module.exports = router;