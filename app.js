const Joi = require('joi');
const home = require('./routes/home');
const members = require('./routes/members');
const admins = require('./routes/admins');
const announcements = require('./routes/announcements');
const guides = require('./routes/guides');
const locations = require('./routes/locations');
const posts = require('./routes/posts');
const tours = require('./routes/tours');
const express = require('express');
const app = express();
const port = process.env.NODE_ENV || 3000;

app.use(express.json());
app.use('/', home);
app.use('/api/members', members);
app.use('/api/admins', admins);
app.use('/api/announcements', announcements);
app.use('/api/guides', guides);
app.use('/api/locations', locations);
app.use('/api/posts', posts);
app.use('/api/tours', tours);

app.listen(port);