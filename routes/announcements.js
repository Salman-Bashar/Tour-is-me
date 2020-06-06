const Joi = require('joi');
const express = require('express');
const router = express.Router();

//Temporary Database
const announcements = [
    { id: 1, title: 'Demo Post 1', details: 'asdasfdsf'},
    { id: 2, title: 'Demo Post 2', details: 'adsgsdaghdfsg'},
    { id: 3, title: 'Demo Post 3', details: 'asdfsdafasdfds'}
];

//Create a new announcement [Post announcement]
router.post('/', (req, res) => {
    const { error } = validateAnnouncement(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const announcement = {
        id: announcements.length + 1,
        title: req.body.title
    };

    announcements.push(announcement);
    res.send(announcement);
});


//Read announcements [View all Announcements]
router.get('/', (req, res) => {
    res.send(announcements);
});

//Read a single announcement [View announcement Details]
router.get('/:id', (req, res) => {
    const announcement = announcements.find(a => a.id === parseInt(req.params.id));
    if (!announcement) return res.status(404).send('No announcement found!');
    res.send(announcement);
});

//Update an announcements [Edit announcement Details]
router.put('/:id', (req, res) => {
    const announcement = announcements.find(a => a.id === parseInt(req.params.id));
    if (!announcement) return res.status(404).send('No announcement found!');

    const { error } = validateAnnouncement(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    announcement.title = req.body.title;
    res.send(announcement);
});

//Delete an announcements
router.delete('/:id', (req, res) => {
    const announcement = announcements.find(a => a.id === parseInt(req.params.id));
    if (!announcement) return res.status(404).send('No announcement found!');

    const index = announcements.indexOf(announcement)
    announcements.splice(index, 1);
    res.send(announcement);
});

//Function to Validate Announcement Details
function validateAnnouncement(announcement) {
    const schema = {
        title: Joi.string().min(6).required()
    }
    return Joi.validate(announcement, schema);
};


module.exports = router;