
const home = require('./routes/home');
const members = require('./routes/members');
const users = require('./routes/users');
const announcements = require('./routes/announcements');
const guides = require('./routes/guides');
const locations = require('./routes/locations');
const posts = require('./routes/posts');
const tours = require('./routes/tours');
const auth = require('./routes/auth');

const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const app = express();
const port = process.env.NODE_ENV || 3000;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/tour-is-me')
    .then(() => console.log('Connected to tour-is-me database...'))
    .catch(err => console.error('Error', err.message));


app.use(express.json());
app.use('/', home);
app.use('/api/members', members);
app.use('/api/signup', users);
app.use('/api/signin', auth);
app.use('/api/announcements', announcements);
app.use('/api/guides', guides);
app.use('/api/locations', locations);
app.use('/api/posts', posts);
app.use('/api/tours', tours);


app.listen(port, () => console.log(`Listening on port ${port}...`));