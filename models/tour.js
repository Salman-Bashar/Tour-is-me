const Joi = require('joi');
const mongoose = require('mongoose');


const Tour = mongoose.model('Tour', new mongoose.Schema({
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
    location: {
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 80
    },
    guide: {
        type: String,
        minlength: 5, 
        maxlength: 80
    }
    //date
}));



//Function to Validate Tour Details
function validateTour(tour) {
    const schema = {
        title: Joi.string().min(5).max(80).required(),
        description: Joi.string().min(10).max(100).required(),
        location: Joi.string().min(5).max(80).required(),
        guide: Joi.string().min(5).max(80)
    }
    return Joi.validate(tour, schema);
};


exports.Tour = Tour;
exports.validateTour = validateTour;