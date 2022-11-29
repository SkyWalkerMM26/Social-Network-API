const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

//creating thought schema
const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 }, 
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: { type: String, required: true },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    });

//retrieves the length of the thought's rxns array field on query.
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        const reactionCount = this.reactions.length;
        return reactionCount;
    })

const Thought = model('thought', thoughtSchema)

module.exports = Thought;