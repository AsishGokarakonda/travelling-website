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
            console.log(Object.keys(req.query));
            console.log(Object.values(req.query));
            const result = Object.values(req.query).every(element => {
                if (element === Object.values(req.query)[0]) {
                  return true;
                }
              });
            
            if (result){
                const packages = await packagesch.find()
                res.status(200).send(packages)
            }
            else{
                searchdict = {}
                // const packages = await packagesch.find({'PackageTravel':'train'})
                // res.status(200).send(packages)
                
                for (let index = 0; index < Object.values(req.query).length; index++) {
                    console.log("hi");
                    const element = Object.values(req.query)[index];
                    if(element == 'flight' || element == 'train' || element == 'bus' || element == 'cab'){
                        searchdict['PackageTravel'] = element
                    }
                    if(element == 'lessnights' || element == 'averagenights' || element == 'morenights'){
                        if(element == 'lessnights'){
                            searchdict['PackageDays'] = {$lte:7}
                        }
                        if(element == 'averagenights'){
                            searchdict['PackageDays'] = {$lte:8,$gte:12}
                        }
                        if(element == 'morenights'){
                            searchdict['PackageDays'] = {$gt:12}
                        }  
                    }
                }
                // console.log(searchdict);
                const packages= await packagesch.find(searchdict)
                res.status(200).send(packages)
                // console.log(packages);
            }
        }
        else{
            const packages = await packagesch.find()
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
        const { PackageName, PackageDescription, PackageCost,PackageTravel, PackageDeparture,PackageDestination,TravelsNumber,PackageHotels,PackageTransfers,PackageActivites, PackageDays,PackageImg,PackageType } = req.body
        let package = await packagesch.create({
            PackageName: PackageName,
            PackageDescription: PackageDescription,
            PackageCost: PackageCost,
            PackageTravel:PackageTravel,
            PackageDeparture: PackageDeparture,
            PackageDestination: PackageDestination,
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