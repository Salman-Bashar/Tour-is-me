const Joi = require('joi');
const express = require('express');
const router = express.Router();

//Temporary Database
const guides = [
    { id: 1, name: 'Guide 1', email: 'guide1@gmail.com', age: 25},
    { id: 2, name: 'Guide 2', email: 'guide2@gmail.com', age: 24},
    { id: 3, name: 'Guide 3', email: 'guide3@gmail.com', age: 30}
];

//Create a new guide [Add Guide]
router.post('/', (req, res) => {
    const { error } = validateGuide(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const guide = {
        id: guides.length + 1,
        name: req.body.name
    };

    guides.push(guide);
    res.send(guide);
});


//Read Guides [Guide List]
router.get('/', (req, res) => {
    res.send(guides);
});

//Read a single Guide [Add Guide Rating]
router.get('/:id', (req, res) => {
    const guide = guides.find(g => g.id === parseInt(req.params.id)); 
    if (!guide) return res.status(404).send('No guide found!');
    res.send(guide);
});

//Update a guide [Edit Guide Details]
router.put('/:id', (req, res) => {
    const guide = guides.find(g => g.id === parseInt(req.params.id)); 
    if (!guide) return res.status(404).send('No guide found!');

    const { error } = validateGuide(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    guide.name = req.body.name;
    res.send(guide);
});

//Delete a guide
router.delete('/:id', (req, res) => {
    const guide = guides.find(g => g.id === parseInt(req.params.id)); 
    if (!guide) return res.status(404).send('No guide found!');

    const index = guides.indexOf(guide)
    guides.splice(index, 1);
    res.send(guide);
});

//Function to validate Guide Details
function validateGuide(guide) {
    const schema = {
        name: Joi.string().min(6).required()
    }
    return Joi.validate(guide, schema);
};

module.exports = router;