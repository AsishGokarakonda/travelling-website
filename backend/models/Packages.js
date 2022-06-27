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
    PackageTravel:{
        type:String,
        required: true,
    },
    PackageDeparture:{
        type:String,
        required: true,
    },
    PackageDestination:{
        type:String,
        required: true,
    },
    PackageStartDate:{
        type:Date,
        required: true,
    },
    PackageEndDate:{
        type:Date,
        required: true,
    },
    PackageMeals:{
        type:Boolean,
        required: true,
    },
    TravelsNumber:{
        type:Number,
        required: true,
    },
    PackageHotels:{
        type:Number,
        required: true,
    },
    PackageTransfers:{
        type:Number,
        required: true,
    },
    PackageActivites:{
        type:Number,
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
    PackageType:{
        type:String,
        required: true,
    },
    });

module.exports = mongoose.model('packages',PackageSchema)
//packages named collection will be created
