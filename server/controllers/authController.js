const mongoose = require('mongoose');
const User = require('../models/user');

function authController () {

        return {
                        
                        async getUser (req, res) {

                               
                                try {

                                        const user = await User.findOne({_id : req.user._id}).select("-password");
                                        
                                        
                                        return res.status(200).json(user);

                                } catch(err) {
        
                                        return res.status(500).json({errors : [{msg : 'Server error'}]})
                                }
                        }

        }

}

module.exports = authController;