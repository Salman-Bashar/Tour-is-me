const { Post, validatePost } = require('../models/post');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//Create a new post [Share Experience]
router.post('/', async (req, res) => {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    post = await post.save();

    res.send(post);
});


//Read posts [View post List]
router.get('/', async (req, res) => {
    const posts = await Post.find().sort('date');
    res.send(posts);
});

//Read a single post [View post Details]
router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id); 
    
    if (!post) return res.status(404).send('No post found!');
    
    res.send(post);
});

//Update a post [Edit post Details]
router.put('/:id', async (req, res) => {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const post = await Post.findByIdAndUpdate(req.params.id, 
        {
            title: req.body.title,
            description: req.body.description
        }, { new: true });
    
    if (!post) return res.status(404).send('No post found!');

    res.send(post);
});

//Delete a post
router.delete('/:id', async (req, res) => {
    const post = await Post.findByIdAndRemove(req.params.id); 
    
    if (!post) return res.status(404).send('No post found!');
    
    res.send(post);
});

module.exports = router;