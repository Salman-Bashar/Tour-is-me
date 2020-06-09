
const { Admin, validateAdmin } = require('../models/admin');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Create an Admin [Add Admin]
router.post('/', async (req, res) => {
    const { error } = validateAdmin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        level: req.body.level
    });
    admin = await admin.save();

    res.send(admin);
});


//Read Admins [View Admin List]
router.get('/', async (req, res) => {
    const admins = await Admin.find().sort('name');
    res.send(admins);
});

//Read a single Admin [View Admin Details]
router.get('/:id', async (req, res) => {
    const admin = await Admin.findById(req.params.id);

    if (!admin) return res.status(404).send('No Admin found for the given ID!');

    res.send(admin);
});

//Update an Admin [Edit Admin Details]
router.put('/:id', async (req, res) => {
    const { error } = validateAdmin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const admin = await Admin.findByIdAndUpdate(req.params.id, 
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            level: req.body.level
        }, { new: true });

    if (!admin) return res.status(404).send('No Admin found for the given ID!');

    res.send(admin);
});

module.exports = router;