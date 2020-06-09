const { Announcement, validateAnnouncement } = require('../models/announcement');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//Create a new announcement [Post announcement]
router.post('/', async (req, res) => {
    const { error } = validateAnnouncement(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let announcement = new Announcement({
        title: req.body.title,
        description: req.body.description
    });
    announcement = await announcement.save();

    res.send(announcement);
});


//Read announcements [View all Announcements]
router.get('/', async (req, res) => {
    const announcements = await Announcement.find().sort('date');
    
    res.send(announcements);
});

//Read a single announcement [View announcement Details]
router.get('/:id', async (req, res) => {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) return res.status(404).send('No announcement found!');

    res.send(announcement);
});

//Update an announcement [Edit announcement Details]
router.put('/:id', async (req, res) => {
    const { error } = validateAnnouncement(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const announcement = await Announcement.findByIdAndUpdate(req.params.id, 
        {
            title: req.body.title,
            description: req.body.description
        }, { new: true });

    if (!announcement) return res.status(404).send('No announcement found!');

    res.send(announcement);
});


//Delete an announcement
router.delete('/:id', async (req, res) => {
    const Announcement = await Announcement.findByIdAndRemove(req.params.id);
  
    if (!announcement) return res.status(404).send('No announcement found!');

    res.send(announcement);
});

module.exports = router;