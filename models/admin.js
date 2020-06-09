const Joi = require('joi');
const mongoose = require('mongoose');


const Admin = mongoose.model('Admin', new mongoose.Schema({
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
    password: {
        type: String, 
        required: true, 
        minlength: 8, 
        maxlength: 16
    },
    level: {
        type: String, 
        enum: [ 'System Admin', 'Moderator' ],
        required: true
    }
}));



//Function to Validate Admin Details
function validateAdmin(admin) {
    const schema = {
        name: Joi.string().min(5).max(80).required(),
        email: Joi.string().min(7).max(80).required(),
        password: Joi.string().min(8).max(16).required(),
        level: Joi.string().required(),
    }
    return Joi.validate(admin, schema);
};


exports.Admin = Admin;
exports.validateAdmin = validateAdmin;