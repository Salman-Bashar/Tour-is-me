const config = require('config');
const jwt = require('jsonwebtoken');    
const Joi = require('joi');                 //Input Validation
const bcrypt = require('bcrypt');           //Password Encryption
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//User Log In
router.post('/', async (req, res) => {
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).send(error.detail[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const userPassword = await bcrypt.compare(req.body.password, user.password);
    if (!userPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();
    res.send(token);
});


//Function to validate Authentication
function validateAuth(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(16).required()
    }
    return Joi.validate(req, schema);
}

module.exports = router;