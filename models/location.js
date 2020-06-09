const Joi = require('joi');
const mongoose = require('mongoose');


const Location = mongoose.model('Location', new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 80
    },
    type: {
        type: String, 
        required: true,
        enum: [ 'Sea', 'Forest', 'Mountain', 'Other' ]
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    }
}));



//Function to Validate Location Details
function validateLocation(location) {
    const schema = {
        name: Joi.string().min(5).max(80).required(),
        type: Joi.string().required(),
        rating: Joi.number().min(0).max(5)
    }
    return Joi.validate(location, schema);
};


exports.Location = Location;
exports.validateLocation = validateLocation;