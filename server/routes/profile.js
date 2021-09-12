const router = require('express').Router();
const profileController = require('../controllers/profileController');
const auth = require('../middleware/auth');

router.post('/', auth, profileController().create); 
router.get('/me', auth, profileController().getProfile); 
router.get('/', profileController().getAllProfiles);
router.get('/user/:userId', profileController().getUserProfile);
router.delete('/', auth, profileController().deleteProfile);
router.put('/experience', auth, profileController().addExperience);
router.delete('/experience/:experienceId', auth, profileController().deleteExperience);
router.put('/education', auth, profileController().addEducation);
router.delete('/education/:educationId', auth, profileController().deleteEducation);
router.get('/github/:username', profileController().getGithubRepo);




module.exports = router;