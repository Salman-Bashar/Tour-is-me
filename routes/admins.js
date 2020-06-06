const Joi = require('joi');
const express = require('express');
const router = express.Router();

//Temporary Database
const admins = [
    { id: 1, name: 'Badhon', email: 'salmanbadhon@gmail.com', position: 'SysAdmin'},
    { id: 2, name: 'Samiha', email: 'afrisamiha@gmail.com', position: 'Moderator'}
];

//Create an Admin [Add Admin]
router.post('/', (req, res) => {
    const { error } = validateAdmin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const admin = {
        id: admins.length + 1,
        name: req.body.name
    };

    admins.push(admin);
    res.send(admin);
});


//Read Admins [View Admin List]
router.get('/', (req, res) => {
    res.send(admins);
});

//Read a single Admin [View Admin Details]
router.get('/:id', (req, res) => {
    const admin = admins.find(a => a.id === parseInt(req.params.id)); 
    if (!admin) return res.status(404).send('No Information Found');
    res.send(admin);
});

//Update an Admin [Edit Admin Details]
router.put('/:id', (req, res) => {
    const admin = admins.find(a => a.id === parseInt(req.params.id)); 
    if (!admin) return res.status(404).send('No Information Found');

    const { error } = validateAdmin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    admin.name = req.body.name;
    res.send(admin);
});


//Function to Validate Admin Details
function validateAdmin(admin) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(admin, schema);
};


module.exports = router;