const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: { 
            type: String, 
            required: true, 
            minLength: 1, 
            maxLength: 280
        },
        createdAt: { 
            type: Date, 
            default: Date.now, 
            get: (date) => {
                if (date) return "On " + date.toISOString().split("T") [0] + " at " + date.toISOString().split("T") [1]; 
            }
        },
        username: { 
            type: String, 
            required: true 
        },
        reactions:[Reaction],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });


// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
