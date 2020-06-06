const Joi = require('joi');
const express = require('express');
const router = express.Router();

//Temporary Database
const tours = [
    { id: 1, title: 'Tour 1', location: 'Dhaka'},
    { id: 2, title: 'Tour 2', location: 'Dhaka'},
    { id: 3, title: 'Tour 3', location: 'Cumilla'}
];


//Create a new tour [Plan a Tour]
router.post('/', (req, res) => {
    const { error } = validateTour(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const tour = {
        id: tours.length + 1,
        title: req.body.title
    };

    tours.push(tour);
    res.send(tour);
});


//Read Tours [Tour List]
router.get('/', (req, res) => {
    res.send(tours);
});

//Read a single Tour [Tour Details]
router.get('/:id', (req, res) => {
    const tour = tours.find(t => t.id === parseInt(req.params.id)); 
    if (!tour) return res.status(404).send('No tour found!');
    res.send(tour);
});

//Update a Tour [Edit Tour Details]
router.put('/:id', (req, res) => {
    const tour = tours.find(t => t.id === parseInt(req.params.id)); 
    if (!tour) return res.status(404).send('No tour found!');

    const { error } = validateTour(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    tour.title = req.body.title;
    res.send(tour);
});

//Delete a Tour
router.delete('/:id', (req, res) => {
    const tour = tours.find(t => t.id === parseInt(req.params.id)); 
    if (!tour) return res.status(404).send('No tour found!');

    const index = tours.indexOf(tour)
    tours.splice(index, 1);
    res.send(tour);
});

//Function to Validate Tour Details
function validateTour(tour) {
    const schema = {
        title: Joi.string().min(6).required()
    }
    return Joi.validate(tour, schema);
};

module.exports = router;