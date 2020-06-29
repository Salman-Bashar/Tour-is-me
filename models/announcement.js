const Joi = require('joi');
const mongoose = require('mongoose');


const Announcement = mongoose.model('Announcement', new mongoose.Schema({
    title: {
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 255
    },
    description: {
        type: String, 
        required: true, 
        minlength: 10, 
        maxlength: 9999
    },
    date: {
        type: Date,
        default: Date.now
    }
}));


//Function to Validate Admin Details
function validateAnnouncement(announcement) {
    const schema = {
        title: Joi.string().min(5).max(255).required(),
        description: Joi.string().min(10).max(9999).required()
    }
    return Joi.validate(announcement, schema);
};

exports.Announcement = Announcement;
exports.validateAnnouncement = validateAnnouncement;