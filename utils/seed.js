const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const { getThought, getReaction, getUser } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // Drop existing users
    await User.deleteMany({});

    // Drop existing reactions
    await Reaction.deleteMany({});

    // Drop existing thoughts
    await Thought.deleteMany({});

    // Create empty array to hold the users
    const users = [];

    // Create empty array to hold the reactions
    const reactions = [];

    // Create empty array to hold the thougths
    const thoughts = [];

    // Create 20 random reactions and push them into the reactions array
    for (let i = 0; i < 20; i++) {
        reactions.push({
            reactionBody: getReaction(i),
            username: getUser(i + 20).username,
        });
    }

    // Wait for the reactions to be inserted into the database
    await Reaction.collection.insertMany(reactions);

    // Create 20 thoughts and push them into the thoughts array
    const makeThought = (i) => {
        thoughts.push({
            thoughtText: getThought(i),
            username: getUser(i).username,
            reactions: [reactions[i]._id]
        });
    }

    // For each of the reaction that exist, make a thought
    let i = 0;
    reactions.forEach(() => {
        makeThought(i);
        i++;
    });

    // Add thoughts to the collection and await the results
    await Thought.collection.insertMany(thoughts);

    // Create 20 users and push them into the users array
    for (let i = 0; i < 40; i++) {
        if (i < 20) {
            users.push({
                username: getUser(i).username,
                email: getUser(i).email,
                thoughts: [thoughts[i]]
            });
        } else {
            users.push({
                username: getUser(i).username,
                email: getUser(i).email,
            });
        }
    }

    


    // Add users to the collection and await the results
    await User.collection.insertMany(users);
  
    //add friends list to each user
    for (let i = 0; i < 20; i++) {
        
        const filter = {_id: users[i]._id};
        const update = {friends:[users[i+1]._id, users[i+20]._id]};
        
        await User.findOneAndUpdate(filter, update, {
            new: true
          });
    }

    console.info('Seeding complete! 🌱');
    process.exit(0);

});