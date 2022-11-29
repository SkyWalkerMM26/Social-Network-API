const { Schema, model } = require('mongoose');

//create new instance of user schema
const userSchema = new Schema(
    {
        username: { type: String, Unique: true, required: true, trimmed: true }, 
        email: { type: String, required: true, unique: true},
        thoughts: [{ type: Schema.Types.Array, ref: 'thought',}],
        friends: [{ type: Schema.Types.ObjectId, ref: 'user',}],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
});

userSchema 
    .virtual('friendCount')
    .get(function () {
        const countFriends = this.friends.length;
        return countFriends
    }) 

const User = model('user', userSchema);

module.exports = User;