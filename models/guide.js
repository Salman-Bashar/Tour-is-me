const Joi = require('joi');
const mongoose = require('mongoose');


const Guide = mongoose.model('Guide', new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 80
    },
    email: {
        type: String, 
        required: true, 
        minlength: 7, 
        maxlength: 80
    },
    location: {
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 80
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
        name: Joi.string().min(5).max(80).required(),
        email: Joi.string().min(7).max(80).required(),
        location: Joi.string().min(5).max(80).required(),
        sex: Joi.string().required(),
        rating: Joi.number().min(0).max(5)
    }
    return Joi.validate(guide, schema);
};


exports.Guide = Guide;
exports.validateGuide = validateGuide;