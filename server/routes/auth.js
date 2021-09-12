const router = require('express').Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.get('/', auth, authController().getUser); 





module.exports = router;