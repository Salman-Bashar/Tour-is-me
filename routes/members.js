
const Joi = require('joi');
const express = require('express');
const router = express.Router();

//Temporary Database
const members = [
    { id: 1, name: 'Badhon', email: 'salmanbadhon@gmail.com', age: 25},
    { id: 2, name: 'Samiha', email: 'afrisamiha@gmail.com', age: 24},
    { id: 3, name: 'Samiba', email: 'salsamiba@gmail.com', age: 3}
];

//Create a new member [Registrartion]
router.post('/', (req, res) => {
    const { error } = validateMember(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const member = {
        id: members.length + 1,
        name: req.body.name
    };

    members.push(member);
    res.send(member);
});

//Read all members [Member List]
router.get('/', (req, res) => {
    res.send(members);
});

//Read a single member [Log In + Profile View]
router.get('/:id', (req, res) => {
    const member = members.find(m => m.id === parseInt(req.params.id)); 
    if (!member) return res.status(404).send('Wrong Username or Password. Please try again!');
    res.send(member);
});

//Update a member [Edit Profile]
router.put('/:id', (req, res) => {
    const member = members.find(m => m.id === parseInt(req.params.id));
    if (!member) return res.status(404).send('Wrong Username or Password. Please try again!');

    const { error } = validateMember(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    member.name = req.body.name;
    res.send(member);
});

//Delete a member [Member Ban]
router.delete('/:id', (req, res) => {
    const member = members.find(m => m.id === parseInt(req.params.id));
    if (!member) return res.status(404).send('Wrong Username or Password. Please try again!');

    const index = members.indexOf(member)
    members.splice(index, 1);
    res.send(member);
});

//Function for validate member details
function validateMember(member) {
    const schema = {
        name: Joi.string().min(6).required()
    }
    return Joi.validate(member, schema);
};

module.exports = router;