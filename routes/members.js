const { Member, validateMember } = require('../models/member');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//Read all members [Member List]
router.get('/', async (req, res) => {
    const members = await Member.find().sort('name');

    res.send(members);
});

//Read a single member [Profile View]
router.get('/:id', async (req, res) => {
    const member = await Member.findById(req.params.id); 

    if (!member) return res.status(404).send('Wrong Username or Password. Please try again!');

    res.send(member);
});

//Update a member [Edit Profile]
router.put('/:id', async (req, res) => {
    const { error } = validateMember(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const member = await Member.findByIdAndUpdate(req.params.id, 
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age,
            sex: req.body.sex,
            location: req.body.location
        }, { new: true });

    if (!member) return res.status(404).send('Wrong Username or Password. Please try again!');

    res.send(member);
});

//Delete a member [Member Ban]
router.delete('/:id', async (req, res) => {
    const member = await Member.findByIdAndRemove(req.params.id);
    
    if (!member) return res.status(404).send('Wrong Username or Password. Please try again!');

    res.send(member);
});

module.exports = router;