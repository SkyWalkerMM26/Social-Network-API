const app = require('express').Router(); 
const User = require('../models/User');
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');

//get all the users. 
// api/users
app.get('/users', async (req, res) => {
    try {
        const getAllUsers = await User.find(); 
        res.status(200).json(getAllUsers);
    } catch (err) {
        res.status(500).json(err); 
    }
});

//get single user by _id
app.get('/users/:_id', async (req, res) => {
    try {
        const singleUser = await User.findOne({ _id: req.params._id });
        res.status(200).json(singleUser);
    } catch (err) {
        res.status(500).json(err);
    }
});


