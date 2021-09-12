const Joi = require('joi');
const mongoose = require('mongoose');
const User = require('../models/user');
const Profile = require('../models/profile');
const Post = require('../models/post');

function postController() {

        return {
                                
                        async addPost(req, res) {

                                
                                        // validation 
                                const postSchema = Joi.object({

                                        text : Joi.string().required()

                                       
                                });

                                const {error} = postSchema.validate(req.body);

                                if(error) {

                                        return res.status(422).json({errors : [{msg : error.details[0].message}]})

                                }


                                try {

                                        const user = await User.findById(req.user._id).select("-password");

                                        const newPost = new Post({

                                                user : req.user._id,
                                                text : req.body.text,
                                                name : user.name,
                                                avatar : user.avatar

                                        });

                                        const post = await newPost.save();

                                        return res.status(200).json(post);


                                } catch(err) {

                                        return res.status(500).json('Server error');

                                }


                        },

                        async getAllPosts(req, res) {

                                try {

                                        const posts = await Post.find().sort({"date" : -1});
                                        
                                        if(!posts) {

                                                return res.status(400).json({msg : 'Posts not found'});

                                        }
                                        
                                        
                                        return res.status(200).json(posts); 

                                } catch(err) {

                                        return res.status(500).json('Server error');

                                }

                        },

                        async getPostById(req, res) {

                                try {

                                        const post = await Post.findById(req.params.postId);

                                        if(!post) {

                                                return res.status(400).json({msg : 'Post not found'});

                                        }

                                        return res.status(200).json(post);


                                } catch(err) {

                                        if(err.kind === 'ObjectId') {

                                                return res.status(400).json({msg : 'Post not found'});

                                        }

                                        return res.status(500).json('Server error');

                                }
                        },

                        async deletePostById(req, res) {

                                try {
                                        const post = await Post.findById(req.params.postId);

                                        if(!post) {

                                                return res.status(404).json({msg : 'Post not found'});

                                        }

                                        if(post.user.toString() !== req.user._id) {

                                                return res.status(400).json({msg : 'User not authorized'});

                                        }

                                        await post.remove();

                                        return res.status(200).json({msg : 'Post deleted'});

                                } catch(err) {

                                        if(err.kind === 'ObjectId') {

                                                return res.status(404).json({msg : 'Post not found'});

                                        }

                                        return res.status(500).json('Server error'); 
                                }
                        },

                        async likePost(req, res) {

                                try {

                                        const post = await Post.findById(req.params.postId);

                                        // Check if this user already liked post

                                        if(post.likes.filter(like => like.user.toString() === req.user._id).length > 0) {

                                                        console.log('Post already liked')
                                                        return res.status(400).json({msg : 'Post already liked'});

                                        }

                                        post.likes.unshift({user : req.user._id});

                                        await post.save();

                                        return res.status(200).json(post.likes);

                                } catch(err) {

                                        return res.status(500).json('Server error');

                                }
                        },

                        async unlikePost(req, res) {

                                try {

                                        const post = await Post.findById(req.params.postId);

                                        // Check if this user liked the post or not

                                        if(post.likes.filter(like => like.user.toString() === req.user._id).length ===0) {

                                                return res.status(400).json({msg : 'This post has not yet been liked'});

                                        }

                                        const index = post.likes.map(like => like.user.toString()).indexOf(req.user._id);

                                        post.likes.splice(index, 1);

                                        await post.save();

                                        return res.status(200).json(post.likes); 

                                } catch(err) {

                                        return res.status(500).json('Server error');

                                }
                        },

                        async addComment(req, res) {

                                  // validation 
                                  const commentSchema = Joi.object({

                                        text : Joi.string().required()

                                       
                                });

                                const {error} = commentSchema.validate(req.body);

                                if(error) {

                                        return res.status(422).json({errors : [{msg : error.details[0].message}]})
        
                                }

                                try {

                                        const user = await User.findById(req.user._id).select("-password");

                                        const post = await Post.findById(req.params.postId); 

                                        const newComment = new Post({

                                                user : req.user._id,
                                                text : req.body.text,
                                                name : user.name,
                                                avatar : user.avatar

                                        });

                                        post.comments.unshift(newComment);

                                        await post.save();

                                        return res.status(200).json(post.comments);


                                } catch(err) {

                                        return res.status(500).json('Server error');

                                }


                        },

                        async deleteComment(req, res) {

                                try {

                                        const post = await Post.findById(req.params.postId);

                                        // Pull out comment

                                        const comment = post.comments.find(comment => comment._id === req.params.commentId);

                                        // Make sure comment exists

                                        if(!comment) {

                                                return res.status(404).json({msg : 'Comment does not exist'});

                                        }

                                        // Check this comment is of this user

                                        if(comment.user.toString() !== req.user._id) {

                                                return res.status(401).json({msg : 'User not authorized to delete this comment'});

                                        }

                                        // find index of comment in array of comments

                                        const index = post.comments.map(comment => comment.user.toString()).indexOf(req.user._id);

                                        post.comments.splice(index, 1);

                                        await post.save();

                                        return res.status(200).json(post.comments);
                                        

                                } catch(err) {

                                        return res.status(500).json('Server error');

                                }
                        }

        }

}

module.exports = postController;