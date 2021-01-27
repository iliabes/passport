const passport = require('passport-local').Strategy;
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/User')


module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField:'email'},(email,password,done)=>{
            //match user
            User.findOne({email:email})
                .then(user => {
                    if(!user){
                        return done(null,false,{message:'That emeil is not regitred'})
                    }
                    bcrypt.compare(password,user.password,(err,isMatch)=>{
                        if(err) throw err;
                        if(isMatch){
                             return done(null,user);
                        }else{
                            return done(null,false,{message:'Password is not correct'})
                        }
                    })
                })
                .catch(err => console.log(err))
        }})
    )
}