require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret

module.exports = function (req, res, next) {

        // Get token from header

        const token = req.header('x-auth-token');

        
        // check if not token

        if(!token) {

                return res.status(400).json({errors : [{msg : 'No token, authorization denied'}]})

        }


        // Verify token

        try {

                const decoded = jwt.verify(token, jwtSecret);

                req.user = decoded.user;

                next();

        } catch(err) {

                return res.status(401).json({errors : [{msg : 'Token is not valid'}]});
                
        }
}