const Joi = require('joi');
const mongoose = require('mongoose');


const Post = mongoose.model('Post', new mongoose.Schema({
    title: {
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 80
    },
    description: {
        type: String, 
        required: true, 
        minlength: 10, 
        maxlength: 1000
    },
    rating: {
        type: Number,
        default: 0
    },
    views: {
        type: Number, 
        default: 0
    },
    comments: {
        type: Array
    },
    published: {
        type: Date,
        default: Date.now
    }
}));



//Function to Validate Post Details
function validatePost(post) {
    const schema = {
        title: Joi.string().min(5).max(80).required(),
        description: Joi.string().min(10).max(100).required(),
        rating: Joi.number(),
        views: Joi.number(),
        published: Joi.date()
    }
    return Joi.validate(post, schema);
};


exports.Post = Post;
exports.validatePost = validatePost;