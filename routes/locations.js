const { Location, validateLocation } = require('../models/location');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//Create a new Location [Add Location]
router.post('/', async (req, res) => {
    const { error } = validateLocation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const location = new Location ({
        name: req.body.name,
        type: req.body.type
    });
    await location.save();
    
    res.send(location);
});


//Read Locations [View Location List]
router.get('/', async (req, res) => {
    const locations = await Location.find().sort('name');

    res.send(locations);
});

//Read a single Location [Location Details]
router.get('/:id', async (req, res) => {
    const location = await Location.findById(req.params.id); 

    if (!location) return res.status(404).send('No location found!');

    res.send(location);
});

//Update a Location [Edit Location Details, Add Rating]
router.put('/:id', async (req, res) => {
    const { error } = validateLocation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const location = await Location.findByIdAndUpdate(req.params.id, 
        {
            name: req.body.name,
            type: req.body.type
        }, { new: true }); 

    if (!location) return res.status(404).send('No location found!');

    res.send(location);
});

//Delete a Location
router.delete('/:id', async (req, res) => {
    const location = await Location.findByIdAndRemove(req.params.id); 

    if (!location) return res.status(404).send('No location found!');

    res.send(location);
});

module.exports = router;