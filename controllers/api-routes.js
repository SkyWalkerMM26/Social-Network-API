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

// create delete route to remove a friend from a user's friend list
app.delete('/users/:_id/friends/:friendId', async (req, res) => {
    try {
        const deleteFriend = await User.findOneAndUpdate({ _id: req.params._id }, { $pull: { friends: req.params.friendId } }, { new: true });
        res.status(200).json(deleteFriend);
    } catch (err) {
        res.status(500).json(err); 
    }
});

// Create get route to thoughts to get all thoughts
app.get('/thoughts', (req, res) => {
    Thought.find({}, (err, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(500).json({ error: 'Error! Man down!' });
        }
    });
});

// create get route to get a single thought by its _id
app.get('/thoughts/:_id', async (req, res) => {
    try {
        const singleThought = await Thought.findOne({ _id: req.params._id });
        res.status(200).json(singleThought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create post route to create a new thought and udpate it
app.post('/thoughts', async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        
        const updateUser = await User.findOneAndUpdate({ username: req.body.username }, { $push: { thoughts: newThought } });
        res.status(200).json(updateUser);

    } catch (err) {
        res.status(500).json(err); 
    }
});

// create put request to thoughts by _id to update thought
app.put('/thoughts/:_id', async (req, res) => {
    try {
        const updateThought = await Thought.findOneAndUpdate({ _id: req.params._id }, { thoughtText: req.body.thoughtText, createdAt: req.body.createdAt });
        res.status(200).json(updateThought);
    } catch (err) {
        res.status(500).json(err);
    }
});