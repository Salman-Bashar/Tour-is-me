const { Guide, validateGuide } = require('../models/guide');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Create a new guide [Add Guide]
router.post('/', async (req, res) => {
    const { error } = validateGuide(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const guide = new Guide ({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        location: req.body.location,
        sex: req.body.sex
    });
    await guide.save();

    res.send(guide);
});


//Read Guides [Guide List]
router.get('/', async (req, res) => {
    const guides = await Guide.find().sort('name');
    res.send(guides);
});

//Read a single Guide [Add Guide Rating]
router.get('/:id', async (req, res) => {
    const guide = await Guide.findById(req.params.id); 
    
    if (!guide) return res.status(404).send('No guide found!');
    
    res.send(guide);
});

//Update a guide [Edit Guide Details]
router.put('/:id', async (req, res) => {
    const { error } = validateGuide(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const guide = await Guide.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            location: req.body.location,
            sex: req.body.sex
        }, { new: true }); 


    if (!guide) return res.status(404).send('No guide found!');

    res.send(guide);
});

//Delete a guide
router.delete('/:id', async (req, res) => {
    const guide = await Guide.findByIdAndRemove(req.params.id); 
    
    if (!guide) return res.status(404).send('No guide found!');

    res.send(guide);
});

module.exports = router;