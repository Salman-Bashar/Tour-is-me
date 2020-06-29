const { Tour, validateTour } = require('../models/tour');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//Create a new tour [Plan a Tour]
router.post('/', async (req, res) => {
    const { error } = validateTour(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const tour = new Tour ({
        title: req.body.title,
        location: req.body.location,
        description: req.body.description
    });
    await tour.save();

    res.send(tour);
});


//Read Tours [Tour List]
router.get('/', async (req, res) => {
    const tours = await Tour.find().sort('title');

    res.send(tours);
});

//Read a single Tour [Tour Details]
router.get('/:id', async (req, res) => {
    const tour = await Tour.findById(req.params.id); 

    if (!tour) return res.status(404).send('No tour found!');

    res.send(tour);
});

//Update a Tour [Edit Tour Details]
router.put('/:id', async (req, res) => {
    const { error } = validateTour(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const tour = await Tour.findByIdAndUpdate(req.params.id, 
        {
            title: req.body.title,
            description: req.body.description,
            location: req.body.location
        }, { new: true });
    
    if (!tour) return res.status(404).send('No tour found!');

    res.send(tour);
});

//Delete a Tour
router.delete('/:id', async (req, res) => {
    const tour = await Tour.findByIdAndRemove(req.params.id); 

    if (!tour) return res.status(404).send('No tour found!');

    res.send(tour);
});

module.exports = router;