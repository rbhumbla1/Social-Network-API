const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getThought, getReaction, getUser } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // Drop existing users
    await User.deleteMany({});

    // Drop existing thoughts
    await Thought.deleteMany({});

    // Create empty array to hold the users
    const users = [];


    // Create empty array to hold the thougths
    const thoughts = [];


    // Create 20 thoughts and push them into the thoughts  reactions: [reactions[i].reactionId]
    for(let i = 0; i < 20; i++) {
        thoughts.push({
            thoughtText: getThought(i),
            username: getUser(i).username,
            reaction: [{reactionBody: getReaction(i),
                        username: getUser(i+20).username},
                        {reactionBody: getReaction(i+1),
                            username: getUser(i+1).username}]
        });
    }

    // Add thoughts to the collection and await the results
    await Thought.collection.insertMany(thoughts);

    // Create 20 users and push them into the users array
    for (let i = 0; i < 40; i++) {
        if (i < 20) {
            users.push({
                username: getUser(i).username,
                email: getUser(i).email,
                thoughts: [thoughts[i]._id]
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