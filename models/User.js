const { Schema, model } = require('mongoose');

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
