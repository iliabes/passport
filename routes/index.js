const express = require('express');
const router = express.Router();




router.use('/dash',(req,res) => {
    res.render('dashbord');
})

//login
router.use('/',(req,res) => {
    res.render('welcome');
})



//register



module.exports = router;