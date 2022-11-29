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

//create post route to create new user.
app.post('/users', async (req, res) => {
    try {
        const newUser = await User.create({ username: req.body.username, email: req.body.email }); 
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json(err); 
    }
});

// create put request to update a user but its _id
app.put('/users/:_id', async (req, res) => {
    try {
        const updateUser = await User.findOneAndUpdate({_id: req.params._id}, { username: req.body.username, email: req.body.email });
        res.status(200).json(updateUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create delete route to remove user by its _id
app.delete('/users/:_id', async (req, res) => {
    try {
        const deleteUser = await User.findOneAndDelete({_id: req.params._id });
        res.status(200).json(deleteUser);
    } catch (err) {
        res.status(500).json(err);
    }
}); 

// create post route to /api/users/:userId/friends/:friendId to add a new friend to a user's friend list.
app.post('/users/:_id/friends/:friendId', async (req, res) => {
    try {
        const newFriend = await User.findOneAndUpdate({ _id: req.params._id }, { friends: req.params.friendId }); 
        res.status(200).json(newFriend);
    } catch (err) {
        res.status(500).json(err); 
    }
});