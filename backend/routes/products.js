const express = require("express");
const usersch = require("../models/User")
const packagesch = require("../models/Packages")
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
let fetchuser = require("../middleware/fetchuser")


secretKey = "nodemon@JWT"

router.get("/getpackages", async (req, res) => {
    try {
        if(Object.keys(req.query).length !== 0){
            const d = new Date();
            let year = d.getFullYear();
            console.log(year);
            console.log(Object.keys(req.query));
            console.log(Object.values(req.query));
            const result = Object.values(req.query).every(element => {
                if (element === Object.values(req.query)[0]) {
                    console.log("hello");
                  return true;
                }
              });
            
            if (result){
                const packages = await packagesch.find()
                res.status(200).send(packages)
            }
            else{
                searchdict = {}
                // if(Object.keys(req.query).includes("departure")){
                //     searchdict.PackageDeparture = req.query.departure
                // }
                for (let index = 0; index < Object.values(req.query).length; index++) {
                    const element = Object.values(req.query)[index];
                    const key = Object.keys(req.query)[index];
                    if((element == 'flight' || element == 'train' || element == 'bus' || element == 'cab') && key == 'travelmode'){
                        searchdict['PackageTravel'] = element
                    }
                    if((element == 'lessnights' || element == 'averagenights' || element == 'morenights') && key == 'nights'){
                        if(element == 'lessnights'){
                            searchdict['PackageDays'] = {$lte:7}
                        }
                        if(element == 'averagenights'){
                            searchdict['PackageDays'] = {$gte:8,$lte:12}
                        }
                        if(element == 'morenights'){
                            searchdict['PackageDays'] = {$gt:12}
                        }  
                    }
                    if((element == '7kless' || element == '7kto13k' || element == '13kto20k' || element == '20kmore')&& key == 'price'){
                        if(element == '7kless'){
                            searchdict['PackageCost'] = {$lt:7000}
                        }
                        if(element == '7kto13k'){
                            searchdict['PackageCost'] = {$lt:13000,$gte:7000}
                        }
                        if(element == '13kto20k'){
                            searchdict['PackageCost'] = {$gte:13000,$lt:20000}
                        }  
                        if(element == '20kmore'){
                            searchdict['PackageCost'] = {$gte:20000}
                        }  
                    }
                    if((element =='Jan'+' '+year || element =='Feb'+' '+year || element =='Mar'+' '+year || element =='Apr'+' '+year || element =='May'+' '+year || element =='Jun'+' '+year || element =='Jul'+' '+year || element =='Aug'+' '+year || element =='Sep'+' '+year || element =='Oct'+' '+year || element =='Nov'+' '+year || element =='Dec'+' '+year || element == 'Jan'+' '+(year+1) || element == 'Feb'+' '+(year+1) || element == 'Mar'+' '+(year+1) || element == 'Apr'+' '+(year+1) || element == 'May'+' '+(year+1) || element =='Jun'+' '+(year+1) || element =='Jul'+' '+(year+1) || element =='Aug'+' '+(year+1) || element =='Sep'+' '+(year+1) || element =='Oct'+' '+(year+1) || element =='Nov'+' '+(year+1) || element =='Dec'+' '+(year+1)) && key == 'month')
                    {
                        const allmonthsnames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
                        const month = allmonthsnames.indexOf(element.substring(0,3))
                        const year = element.substring(4,8)
                        const date = new Date(year,month,31)
                        const date2 = new Date(year,month,1)
                        searchdict['PackageStartDate'] = {$lte:date}
                        searchdict['PackageEndDate'] = {$gte:date2}
                        console.log(date);

                    }
                    if(key=='departure'){
                        if(element !=''){
                            searchdict['PackageDeparture'] =  { $regex: new RegExp("^" + element.toLowerCase(), "i") } 
                        }
                        console.log(searchdict['PackageDeparture']);
                    }
                    if(key=='destination'){
                        if(element !=''){
                            searchdict['PackageDestination'] =  { $regex: new RegExp("^" + element.toLowerCase(), "i") } 
                        }
                        console.log(searchdict['PackageDestination']);
                    }
                }
                const packages= await packagesch.find(searchdict)
                res.status(200).send(packages)
            }
        }
        else{
            const packages = await packagesch.find({PackageStartDate:{$gte:new Date("2022-07-24")}})
            res.status(200).send(packages)
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured")
    }
})

router.get("/toppackages", async (req, res) => {
    try {
        const packages = await packagesch.find({"PackageType": "top"})
        res.status(200).send(packages)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured")
    }
})

router.get("/featuredpackages", async (req, res) => {
    try {
        const packages = await packagesch.find({"PackageType": "featured"})
        res.status(200).send(packages)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured")
    }
})


router.get("/adventurepackages", async (req, res) => {
    try {
        const packages = await packagesch.find({"PackageType": "adventure"})
        res.status(200).send(packages)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured")
    }
})










router.get("/adventurepackages", async (req, res) => {
    try {
        const packages = await packagesch.find({"PackageType": "adventure"})
        res.status(200).send(packages)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured")
    }
})



//add notes to a particular person's notes with auth token provided in header
router.post("/addpackage", body('PackageName').isLength({ min: 3 }), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { PackageName, PackageDescription, PackageCost,PackageTravel, PackageDeparture,PackageDestination, PackageStartDate, PackageEndDate,TravelsNumber,PackageHotels,PackageTransfers,PackageActivites, PackageDays,PackageImg,PackageType } = req.body
        let package = await packagesch.create({
            PackageName: PackageName,
            PackageDescription: PackageDescription,
            PackageCost: PackageCost,
            PackageTravel:PackageTravel,
            PackageDeparture: PackageDeparture,
            PackageDestination: PackageDestination,
            PackageStartDate: PackageStartDate,
            PackageEndDate: PackageEndDate,
            TravelsNumber: TravelsNumber,
            PackageHotels: PackageHotels,
            PackageTransfers: PackageTransfers,
            PackageActivites: PackageActivites,
            PackageDays: PackageDays,
            PackageImg: PackageImg,
            PackageType: PackageType
        })
        res.status(200).send(package)

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured")
    }
})

module.exports = router