require('dotenv').config();
const Joi = require('joi');
const mongoose = require('mongoose');
const User = require('../models/user');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;
const bcrypt = require('bcrypt');
function userController () {

        return {

                async register (req, res) {

                       
                        // validation 
                        const registerSchema = Joi.object({

                                name : Joi.string().min(3).max(30).required(),

                                email : Joi.string().email().required(),

                                password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()

                        });

                        const {error} = registerSchema.validate(req.body);

                        if(error) {

                                console.log(error.details[0].message)
                                return res.status(422).json({errors : [{msg : error.details[0].message}]})

                                

                        }

                        // Check if user already exists

                        const {name, email, password} = req.body;

                        try {

                                let user = await User.findOne({email});

                               
                                if(user) {

                                        return res.status(403).json({errors : [{msg : 'User already exists'}]})

                                }

                                const avatar = gravatar.url(email, {
                                        
                                        s : '200',
                                        r : 'pg',
                                        d : 'mm'
                                });

                                
                                const hashedPassword = await bcrypt.hash(password, 10);

                                
                                const newUser = new User({

                                        name,
                                        email,
                                        avatar,
                                        password: hashedPassword

                                });

                                
                                
                                const savedUser = await newUser.save();

                                // Generate jwt Token

                                const payload = {

                                        user : {

                                                _id : savedUser._id

                                        }
                                }

                                jwt.sign(payload, 
                                        jwtSecret,
                                        {expiresIn : 360000},
                                        (err, token) => {

                                                if(err) throw err;

                                                return res.json({token}) 

                                        });
                                       

                        } catch(err) {

                                return res.status(500).json({errors : [{msg : 'Server Error'}]})

                        }
                        

                },

                async login(req, res) {

                        
                         // validation 
                         const loginSchema = Joi.object({

                                email : Joi.string().email().required(),

                                password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()

                        });

                        const {error} = loginSchema.validate(req.body);

                        if(error) {

                                return res.status(422).json({errors : [{msg : error.details[0].message}]})

                        }

                        const {email, password} = req.body;

                        try {

                                const user = await User.findOne({email});

                                if(!user) {

                                        return res.status(404).json({errors : [{msg : 'Wrong username or password'}]})

                                }

                                try {

                                        const match = await bcrypt.compare(password, user.password);

                                        if(!match) {

                                                return res.status(400).json({errors : [{msg : 'Wrong username or password'}]})

                                        }

                                        const payload = {

                                                user : {
        
                                                        _id : user._id
        
                                                }
                                        }

                                        jwt.sign(payload, 
                                                jwtSecret,
                                                {expiresIn : 360000},
                                                (err, token) => {
        
                                                        if(err) throw err;
                                                        
                                                        
                                                        return res.json({token}) 
        
                                                });




                                } catch(err) {

                                        return res.status(500).json({errors : [{msg : 'Server Error'}]})

                                }

                        } catch(err) {

                                return res.status(500).json({errors : [{msg : 'Server Error'}]})

                        }

                }
        }

}

module.exports = userController;