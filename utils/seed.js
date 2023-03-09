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

    

    //add friends list to each user
    for (let i = 0; i < 20; i++) {
        let friend1, friend2;
        friend1 = { username: users[i + 20].username, email: users[i + 20].email };

        friend2 = { username: users[i + 1].username, email: users[i + 1].email };
        users[i].friends = [friend1, friend2]
    }

    // Add users to the collection and await the results
    await User.collection.insertMany(users);

    // // Loop 20 times -- add reactions to the reactions array
    // for (let i = 0; i < 20; i++) {
    //     // Get some random reaction objects using a helper function that we imported from ./data
    //     const user = getUser(i);
    //     const thought = getThought(i);
    //     const reaction = [{ reactionText: getReaction(i), username: getUser(i + 20).username },
    //     { reactionText: getReaction(i + 1), username: getUser(i + 1).username }];

    //     let thoughtObj = {
    //         thoughtText: thought,
    //         username: user.username,
    //         reactions: [reaction]
    //     };

    //     thoughts.push(thoughtObj);

    //     let friend1, friend2;
    //     friend1 = { username: getUser(i + 20).username, email: getUser(i + 20).email };

    //     friend2 = { username: getUser(i + 1).username, email: getUser(i + 1).email };

    //     users.push({
    //         username: user.username,
    //         email: user.email,
    //         thoughts: [thoughtObj],
    //         friends: [friend1, friend2]
    //     })
    // }

    // console.log(thoughts);
    // console.log(users);


    // // Add users to the collection and await the results
    // await User.collection.insertMany(users);

    // // Add thoughts to the collection and await the results
    // await Thought.collection.insertMany(thoughts);

    console.info('Seeding complete! 🌱');
    process.exit(0);

});