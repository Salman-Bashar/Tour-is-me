const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    isAdmin: {
        type: Boolean, 
        default: false
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, name: this.name, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);



//Function to Validate User Details
function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(16).required()
    }
    return Joi.validate(user, schema);
};

exports.User = User;
exports.validateUser = validateUser;