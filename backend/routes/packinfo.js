const express = require("express");
const usersch = require("../models/User")
const packagesch = require("../models/Packages")
const eachpacksch = require("../models/EachPackInfo")
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
let fetchuser = require("../middleware/fetchuser")


secretKey = "nodemon@JWT"

router.post("/packoverview/:id",async(req,res)=>{
    try{
        const packages = await packagesch.findById(req.params.id)
        console.log(req.params.id);
        const eachpacks = await eachpacksch.find({packageId:req.params.id})

        if(packages){
            if(eachpacks.length > 0){
                res.status(200).send({"Pack overview exists for this packages and that is":eachpacks})
            }
            else{
                const {highlights,fulldescription,traveldetails,accommodation,activities,meals,transfers} = req.body 
                let packoverview = await eachpacksch.create({
                    packageId:req.params.id,
                    highlights:highlights,
                    fulldescription:fulldescription,
                    traveldetails:traveldetails,
                    accommodation:accommodation,
                    activities:activities,
                    meals:meals,
                    transfers:transfers
                })
                res.status(200).send(packoverview)
            }

        }
        else{
            res.status(404).send("Package not found")
        }
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server error occured")
    }
})

router.get("/getpackoverview/:id",async(req,res)=>{
    try{
        const eachpacks = await eachpacksch.find({packageId:req.params.id})
        if(eachpacks.length > 0){
            res.status(200).send(eachpacks)
        }
        else{
            res.status(404).send("Packoverview not found")
        }
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server error occured")
    }
}
)

module.exports = router