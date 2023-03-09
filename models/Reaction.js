const { Schema, model } = require('mongoose');

// Schema to create Reaction Schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                if (date) return "On " + date.toISOString().split("T")[0] + " at " + date.toISOString().split("T")[1];
            }
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// Initialize our User model
const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
