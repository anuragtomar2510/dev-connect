require('dotenv').config();
const request = require('request');
const mongoose = require('mongoose');
const User = require('../models/user');
const Profile = require('../models/profile');
const Post = require('../models/post');
const Joi = require('joi');
const normalize = require('normalize-url');

const githubClientId = process.env.githubClientId;
const githubClientSecret = process.env.githubClientSecret;


function profileController () {

        return {

                        async create(req, res) {

                                
                                const { 

                                        company,
                                        website,
                                        location,
                                        bio,
                                        status,
                                        githubusername,
                                        skills,
                                        youtube,
                                        facebook,
                                        twitter,
                                        instagram,
                                        linkedin
 
                                } = req.body;
                                
                                // Validation of required fields

                                
                                const profileSchema = Joi.object({

                                        status : Joi.string().required(),
                                        skills : Joi.string().required()

                               });

                               const {error} = profileSchema.validate({status, skills});

                           
                               if(error) {

                                        
                                       return res.status(422).json({errors : [{msg : error.details[0].message}]})
       
                               }

                               


                           

                             
                               // Build profile object

                               const newProfile = {};

                               newProfile.user = req.user._id;

                               if(company) newProfile.company = company;
                               if(website) newProfile.website = normalize(website, {forceHttps : true});
                               if(location) newProfile.location = location;
                               if(bio) newProfile.bio = bio;
                               if(status) newProfile.status = status;
                               if(githubusername) newProfile.githubusername = githubusername

                               if(skills) {

                                        newProfile.skills = skills.split(',').map(skill => skill.trim());

                               }

                               newProfile.social = {};

                               if(youtube) newProfile.social.youtube = normalize(youtube, {forceHttps : true});
                               if(twitter) newProfile.social.twitter = normalize(twitter, {forceHttps : true});
                               if(facebook) newProfile.social.facebook = normalize(facebook, {forceHttps : true});
                               if(linkedin) newProfile.social.linkedin = normalize(linkedin, {forceHttps : true});
                               if(instagram) newProfile.social.instagram = normalize(instagram, {forceHttps : true});

                               
                               try {

                                        let profile = await Profile.findOne({ user : req.user._id})

                                        if(profile) {

                                                profile = await Profile.findOneAndUpdate(
                                                        {user : req.user._id},
                                                        {$set : newProfile},
                                                        {new : Profile}
                                                );

                                                return res.status(200).json(profile);

                                        }

                                        profile = new Profile(newProfile);

                                        await profile.save();

                                        return res.status(200).json(profile);

                               } catch(err) {

                                        return res.status(500).json('server error');

                               }

                        },

                        async getProfile(req, res) {

                               
                                try {

                                        const profile = await Profile.findOne({user : req.user._id}).populate('user', ['name', 'avatar']);

                                        
                                        if(!profile) {

                                                return res.status(400).json({ msg: 'There is no profile for this user' });

                                        }

                                        console.log(profile)

                                        return res.status(200).json(profile);

                                } catch(err) {

                                        return res.status(500).json('Server Error')
                                }
                        },

                        async getAllProfiles (req, res) {

                                try {
                                        const profiles = await Profile.find().populate('user', ['name', 'avatar']);

                                        if(!profiles) {

                                                return res.status(400).json({msg : 'No Profile Found'})

                                        }

                                        return res.status(200).json(profiles);

                                } catch(err) {

                                        return res.status(500).json('Server error')

                                }
                        },

                        async getUserProfile(req, res) {

                                try {

                                        const profile = await Profile.findOne({user : req. params.userId}).populate('user', ['name', 'avatar']);

                                        if(!profile) {

                                                return res.status(400).json({msg : 'There is no profile for this user'})

                                        }

                                        return res.status(200).json(profile);
                                } catch(err) {

                                        if(err.kind == 'ObjectId') {

                                                return res.status(400).json({msg : 'There is no profile for this user'})

                                        }

                                        return res.status(500).json('Server error');
                                }
                        },

                        async deleteProfile(req, res) {

                                try {

                                        await Post.deleteMany({user : req.user._id})
                                        await Profile.findOneAndRemove({user : req.user._id});
                                        await User.findOneAndRemove({_id : req.user._id});

                                        return res.status(200).json({msg : 'User removed'});

                                } catch(err) {

                                        console.log(err.message)
                                        return res.status(500).json('Server error')

                                }
                        },

                        async addExperience(req, res) {

                                const {

                                        title, 
                                        company,
                                        location,
                                        from,
                                        to,
                                        current,
                                        description,

                                } = req.body;


                                // Validation of required fields

                                
                                const expSchema = Joi.object({

                                        title : Joi.string().required(),
                                        company : Joi.string().required()

                               });

                               const {error} = expSchema.validate({title, company});

                           
                               if(error) {

                                        
                                       return res.status(422).json({errors : [{msg : error.details[0].message}]})
       
                               }

                                const newExp = {

                                        title,
                                        company,
                                        location,
                                        from,
                                        to,
                                        current,
                                        description

                                };

                                console.log(newExp);

                                try {

                                        const profile = await Profile.findOne({ user : req.user._id});

                                        profile.experience.unshift(newExp);

                                        await profile.save(); 

                                        return res.status(200).json(profile);

                                } catch(err) {

                                        return res.status(500).json('Server error')

                                }
                        },

                        async deleteExperience(req, res) {

                                try {

                                        const profile = await Profile.findOne({ user : req.user._id});

                                        const _idArray = profile.experience.map(item => item._id);

                                        const index = _idArray.indexOf(req.params.experienceId);

                                        profile.experience.splice(index, 1); 

                                        await profile.save();

                                        return res.status(200).json(profile);

                                } catch(err) {

                                        return res.status(500).json('Server error')
                                }
                        },

                        async addEducation(req, res) {

                        
                                const {

                                        school,
                                        degree,
                                        fieldofstudy,
                                        from,
                                        to,
                                        current,
                                        description

                                } = req.body;



                                // Validation of required fields

                                
                                const eduSchema = Joi.object({

                                        school : Joi.string().required(),
                                        degree : Joi.string().required()

                               });

                               const {error} = eduSchema.validate({school, degree});

                           
                               if(error) {

                                        
                                       return res.status(422).json({errors : [{msg : error.details[0].message}]})
       
                               }

                                const newEdu = {

                                        school,
                                        degree,
                                        fieldofstudy,
                                        from,
                                        to,
                                        current,
                                        description

                                };


                                
                                try {

                                        const profile = await Profile.findOne({ user : req.user._id});

                                        
                                        
                                        profile.education.unshift(newEdu);

                                        console.log(profile.education);
                                        await profile.save();


                                        console.log(profile);
                                        return res.status(200).json(profile);


                                } catch(err) {

                                        return res.status(500).json('Server error');

                                }

                        },

                        async deleteEducation(req, res) {

                                try {

                                        const profile = await Profile.findOne({ user : req.user._id});

                                        const _idArray = profile.education.map(item => item._id);

                                        const index = _idArray.indexOf(req.params.educationId);

                                        profile.education.splice(index, 1);

                                        await profile.save();

                                        return res.status(200).json(profile);

                                } catch(err) {

                                        return res.status(500).json('Server error');

                                }
                        },

                        getGithubRepo(req, res) {

                                try {

                                        const options = {

                                                uri : `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`,

                                                method : 'GET',

                                                headers : {'user-agent' : 'node.js'}

                                        }

                                        request(options, (error, response, body) => {

                                                if(error) console.log(error);

                                                if(response.statusCode !== 200) {

                                                        return res.status(404).json({msg : 'No github profile found'});

                                                }

                                                return res.status(200).json(JSON.parse(body));

                                        })

                                } catch(err) {

                                        return res.status(500).json('Server error');

                                }
                        }
        }


}

module.exports = profileController;