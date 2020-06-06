const Joi = require('joi');
const express = require('express');
const router = express.Router();

//Temporary Database
const posts = [
    { id: 1, title: 'Badhon', email: 'salmanbadhon@gmail.com', age: 25},
    { id: 2, title: 'Samiha', email: 'afrisamiha@gmail.com', age: 24},
    { id: 3, title: 'Samiba', email: 'salsamiba@gmail.com', age: 3}
];

//Create a new post [Share Experience]
router.post('/', (req, res) => {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const post = {
        id: posts.length + 1,
        title: req.body.title
    };

    posts.push(post);
    res.send(post);
});


//Read posts [View post List]
router.get('/', (req, res) => {
    res.send(posts);
});

//Read a single post [View post Details]
router.get('/:id', (req, res) => {
    const post = posts.find(m => m.id === parseInt(req.params.id)); 
    if (!post) return res.status(404).send('No post found!');
    res.send(post);
});

//Update a post [Edit post Details]
router.put('/:id', (req, res) => {
    const post = posts.find(m => m.id === parseInt(req.params.id)); 
    if (!post) return res.status(404).send('No post found!');

    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    post.title = req.body.title;
    res.send(post);
});

//Delete a post
router.delete('/:id', (req, res) => {
    const post = posts.find(m => m.id === parseInt(req.params.id)); 
    if (!post) return res.status(404).send('No post found!');

    const index = posts.indexOf(post)
    posts.splice(index, 1);
    res.send(post);
});

//Function to Validate post Details
function validatePost(post) {
    const schema = {
        title: Joi.string().min(6).required()
    }
    return Joi.validate(post, schema);
};


module.exports = router;