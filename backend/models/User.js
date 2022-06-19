const mongoose = require("mongoose")
const { Schema } = mongoose;
const UserSchema = new Schema({
    FirstName: {
        type:String,
        required: true
    },
    LastName: {
        type:String,
        required: true,
    },
    Email: {
        type:String,
        required: true,
        unique: true
    },
    DateOfBirth: {
        type: Date,
        required:true
    },
    Address:{
        type: String,
        required:true
    },
    MobileNumber:{
        type: Number,
        required:true
    },
    Username:{
        type:String,
        required: true,
    },
    Password: {
        type:String,
        required: true,
    },
     });

module.exports = mongoose.model('users',UserSchema)
//users named collection will be created
