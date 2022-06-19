const express = require("express");
const usersch = require("../models/User")
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
let fetchuser = require("../middleware/fetchuser")

secretKey = "nodemon@JWT"



//create user with end point /api/auth/createuser. No login required
router.post("/createuser",
    //validations for name,email,password
    body('Username').isLength({ min: 3 }),
    body('Email').isEmail(),
    body('Password').isLength({ min: 5 }), async (req, res) => {
        try {
            //if there are any errors in validations,then they will be displayed
            // console.log("HI");
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            //checking whether user exists already or not.
            let user1 = await usersch.findOne({ Email: req.body.Email })
            // console.log("Hi");
            if (user1) {
                return res.status(400).json({ error: "This email already exists" })
            }
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(req.body.Password, salt);
            let data = {
                user: {
                    id: usersch.id
                }
            }
            // console.log("bye");
            var token = jwt.sign(data, secretKey);
            //if user doesn't exist, new user will be created.
            console.log(req.body);
            let user = await usersch.create({
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Email: req.body.Email,
                DateOfBirth: req.body.DateOfBirth,
                Address: req.body.Address,
                MobileNumber: req.body.MobileNumber,
                Username: req.body.Username,
                Password: hash,
            }).then(user => res.json({ "Authorization": token }))
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server error occured")
        }
    })




//Login a user with end point /api/auth/loginuser. login required
router.post("/loginuser",
    //validations for email
    body('Email').isEmail(), async (req, res) => {
        let success = false
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let user = await usersch.findOne({ Email: req.body.Email })
            if (!user) {
                return res.status(400).send({ success, "message": "Sorry,No user with this email and password exists" })
            }
            let login = await bcrypt.compare(req.body.Password, user.Password);
            if (!login) {
                return res.status(400).send({ success, "message": "Please login with correct credentials" })
            }
            let data = {
                user: {
                    id: user.id
                }
            }
            var token = jwt.sign(data, secretKey);
            success = true
            return res.status(200).send({ success, token })

        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server error occured")
        }
    })




module.exports = router