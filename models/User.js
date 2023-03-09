const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const thoughtSchema = require('./Thought').schema;


// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/,
        },
        thoughts: [thoughtSchema],
        friends: [this],
    },
    {
        toJSON: {
            getters: true,
            virtual: true
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
