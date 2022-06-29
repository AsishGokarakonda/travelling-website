const mongoose = require("mongoose")
const { Schema } = mongoose;
const EachDayPack = new Schema({ 
    packageId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'packages'
    },
    daynumber:{
        type:Number,
        required:true
    },
    fulldescription:{
        type:String,
        required:true
    },
    accommodation:{
        type:String,
        required:true
    },
    meals:{
        type:String,
        required:true
    },
    imagefilename:{
        type:String,
        required:true
    }
 });

module.exports = mongoose.model("eachdayPack",EachDayPack)