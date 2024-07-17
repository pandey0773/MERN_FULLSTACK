const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    dob:String,
    email:String,
    firstName:String,
    gender:String,
    lastName:String,
    password:Number,
    })

const NewUsers = mongoose.model("NewUsers", userSchema)

module.exports = NewUsers;