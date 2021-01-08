const  mongoose = require('mongoose')


const UserShema = new mongoose.Shema({
    name:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true
    },
    password:{
        type: String,
        require:true
    },
    date:{
        type: Date,
        default:Date.now
    },
})


const User = mongoose.model('User',UserShema)

module.exports = User;