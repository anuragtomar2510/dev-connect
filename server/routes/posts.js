const router = require('express').Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');



router.post('/', auth, postController().addPost);
router.get('/', auth, postController().getAllPosts);
router.get('/:postId', auth, postController().getPostById);
router.delete('/:postId', auth, postController().deletePostById);
router.put('/like/:postId', auth, postController().likePost);
router.put('/unlike/:postId', auth, postController().unlikePost);
router.put('/comment/:postId', auth, postController().addComment);
router.delete('./comment/:postId/:commentId', auth, postController().deleteComment);




module.exports = router