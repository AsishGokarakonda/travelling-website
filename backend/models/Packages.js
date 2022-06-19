const mongoose = require("mongoose")
const { Schema } = mongoose;
const PackageSchema = new Schema({
    PackageName: {
        type:String,
        required: true,
        unique: true
    },
    PackageDescription:{
        type:String,
        required: true
    },
    PackageCost: {
        type:Number,
        required: true,
    },
    PackageDeparture:{
        type:String,
        required: true,
    },
    PackageDays:{
        type:Number,
        required: true,
    },
    PackageImg: {
        type:String,
        required:true
    },
    TopPackage:{
        type:Boolean,
        required: true,
    },
    });

module.exports = mongoose.model('packages',PackageSchema)
//packages named collection will be created
