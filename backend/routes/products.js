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
        const packages = await packagesch.find()
        res.status(200).send(packages)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured")
    }
})
router.get("/gettoppackages", async (req, res) => {
    try {
        const packages = await packagesch.find({"TopPackage": true})
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
        const { PackageName, PackageDescription, PackageCost,PackageTravel, PackageDeparture,PackageDestination,PackageFlights,PackageHotels,PackageTransfers,PackageActivites, PackageDays,PackageImg,TopPackage } = req.body
        let package = await packagesch.create({
            PackageName: PackageName,
            PackageDescription: PackageDescription,
            PackageCost: PackageCost,
            PackageTravel:PackageTravel,
            PackageDeparture: PackageDeparture,
            PackageDestination: PackageDestination,
            PackageFlights: PackageFlights,
            PackageHotels: PackageHotels,
            PackageTransfers: PackageTransfers,
            PackageActivites: PackageActivites,
            PackageDays: PackageDays,
            PackageImg: PackageImg,
            TopPackage: TopPackage
        })
        res.status(200).send(package)

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured")
    }
})

module.exports = router