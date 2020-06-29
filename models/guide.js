const Joi = require('joi');
const mongoose = require('mongoose');


const Guide = mongoose.model('Guide', new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 255
    },
    phone: {
        type: String,
        required: true,
        minlength: 11,
        maxlength:11
    },
    email: {
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 255
    },
    location: {
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 255
    },
    sex: {
        type: String, 
        enum: [ 'Male', 'Female' ],
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    }
}));



//Function to Validate Guide Details
function validateGuide(guide) {
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        phone: Joi.string().min(11).max(11).required(),
        email: Joi.string().min(5).max(255).required().email(),
        location: Joi.string().min(5).max(255).required(),
        sex: Joi.string().required(),
        rating: Joi.number().min(0).max(5)
    }
    return Joi.validate(guide, schema);
};


exports.Guide = Guide;
exports.validateGuide = validateGuide;