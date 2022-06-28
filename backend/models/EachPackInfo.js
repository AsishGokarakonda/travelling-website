const mongoose = require("mongoose")
const { Schema } = mongoose;
const EachPackInfo = new Schema({ 
    packageId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'packages'
    },
    fulldescription:{
        type:String,
        required:true
    },
    highlights: {
        type: String,
        required: true
    },
    traveldetails:{
        type: String,
        required: true
    },
    accommodation:{
        type:String,
        required:true
    },
    activities:{
        type:String,
        required:true
    },
    meals:{
        type:String,
        required:true
    },
    transfers:{
        type:String,
        required:true
    },
 });

module.exports = mongoose.model("eachpack",EachPackInfo)