const express = require("express");
const usersch = require("../models/User")
const packagesch = require("../models/Packages")
const eachpacksch = require("../models/EachPackInfo")
const eachdaypacksch = require("../models/EachDayPack")
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
                return res.status(200).send({"Pack overview exists for this packages and that is":eachpacks})
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
                return res.status(200).send(packoverview)
            }

        }
        else{
            return res.status(404).send("Package not found")
        }
    }
    catch(error){
        console.error(error.message);
        return res.status(500).send("Internal Server error occured")
    }
})

router.get("/getpackoverview/:id",async(req,res)=>{
    try{
        const eachpacks = await eachpacksch.find({packageId:req.params.id})
        if(eachpacks.length > 0){
            return res.status(200).send(eachpacks)
        }
        else{
            return res.status(404).send("Packoverview not found")
        }
    }
    catch(error){
        console.error(error.message);
        return res.status(500).send("Internal Server error occured")
    }
}
)

router.post("/eachdaypack/:id",async(req,res)=>{
    try{
        const packages = await packagesch.findById(req.params.id)
        console.log(packages.PackageDays);
        if(!packages){
            return res.status(404).send("Package not found")
        }
        const eachday = await eachdaypacksch.find({packageId:req.params.id})
        if(eachday.length >= packages.PackageDays){
            return res.status(400).send("Package already has all the days")
        }
        const eachdaypack = await eachdaypacksch.create({
            packageId:req.params.id,
            daynumber:req.body.daynumber,
            fulldescription:req.body.fulldescription,
            accommodation:req.body.accommodation,
            meals:req.body.meals,
            imagefilename:req.body.imagefilename
        })
        return res.status(200).send(eachdaypack)
    }
    catch(error){
        console.error(error.message);
        return res.status(500).send("Internal Server error occured")
    }

})

router.get("/geteachdaypack/:id",async(req,res)=>{
    const day = req.headers.day
    try{
        const eachday = await eachdaypacksch.find({packageId:req.params.id})
        var daynotfound = true
        if(eachday.length > 0){
            for (let index = 0; index < eachday.length; index++) {
                const element = eachday[index];
                if(element.daynumber == day){
                    daynotfound = false
                    return res.status(200).send(element)
                }
            }
            if(daynotfound){
                return res.status(404).send("Day not found")
            }
        }
        else{
            return res.status(404).send("Eachdaypack not found")
        }
    }
    catch(error){
        console.error(error.message);
        return res.status(500).send("Internal Server error occured")
    }
})

module.exports = router