const Joi = require('joi');
const express = require('express');
const router = express.Router();

//Temporary Database
const locations = [
    { id: 1, name: 'Dhaka', rating: 4},
    { id: 2, name: 'Cumilla', rating: 3},
    { id: 3, name: 'Rajshahi', rating: 5}
];

//Create a new Location [Add Location]
router.post('/', (req, res) => {
    const { error } = validateLocation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const location = {
        id: locations.length + 1,
        name: req.body.name
    };

    locations.push(location);
    res.send(location);
});


//Read Locations [View Location List]
router.get('/', (req, res) => {
    res.send(locations);
});

//Read a single Location [Location Details]
router.get('/:id', (req, res) => {
    const location = locations.find(m => m.id === parseInt(req.params.id)); 
    if (!location) return res.status(404).send('No location found!');
    res.send(location);
});

//Update a Location [Edit Location Details, Add Rating]
router.put('/:id', (req, res) => {
    const location = locations.find(m => m.id === parseInt(req.params.id)); 
    if (!location) return res.status(404).send('No location found!');

    const { error } = validateLocation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    location.name = req.body.name;
    res.send(location);
});

//Delete a Location
router.delete('/:id', (req, res) => {
    const location = locations.find(m => m.id === parseInt(req.params.id)); 
    if (!location) return res.status(404).send('No location found!');

    const index = locations.indexOf(location)
    locations.splice(index, 1);
    res.send(location);
});

//Function to Validate Location Details
function validateLocation(location) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(location, schema);
};

module.exports = router;