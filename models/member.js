const Joi = require('joi');
const mongoose = require('mongoose');


const Member = mongoose.model('Member', new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 255
    },
    email: {
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 255
    },
    password: {
        type: String, 
        required: true, 
        minlength: 8, 
        maxlength: 255
    },
    age: {
        type: Number, 
        required: true,
        min: 18,
    },
    sex: {
        type: String, 
        enum: [ 'Male', 'Female' ],
        required: true
    },
    location: {
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 255
    }
}));



//Function to Validate Member Details
function validateMember(member) {
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(16).required(),
        age: Joi.number().min(18).required(),
        sex: Joi.string().required(),
        location: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(member, schema);
};


exports.Member = Member;
exports.validateMember = validateMember;