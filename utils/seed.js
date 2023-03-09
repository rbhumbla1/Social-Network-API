const connection = require('../config/connection');
const { User, Thought} = require('../models');
const {getThought, getReaction, getUser } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await User.deleteMany({});

  // Drop existing students
  await Thought.deleteMany({});

  // Create empty array to hold the users
const users  = [];

  // Create empty array to hold the thougths
  const thoughts  = [];

// Loop 20 times -- add reactions to the reactions array
for (let i = 0; i < 20; i++) {
  // Get some random reaction objects using a helper function that we imported from ./data
  const user = getUser(i);
 const thought = getThought(i);
 const reaction = {reactionText: getReaction(i), username: getUser(i+20)};

  let thoughtObj = {
    thoughtText: thought,
    username: user.username,
    reactions:[reaction]
  };

  thoughts.push(thoughtObj);

  let friend1, friend2;
  friend1 = {username: getUser(i+20).username, email: getUser(i+20).email};

 friend2 = {username: getUser(i+1).username, email: getUser(i+1).email};
  
  users.push({
    username: user.username,
    email: user.email,
    thoughts: [thoughtObj],
    friends: [friend1, friend2]
  })
}

console.log(thoughts);
console.log(users);


// Add users to the collection and await the results
await User.collection.insertMany(users);

// Add thoughts to the collection and await the results
await Thought.collection.insertMany(thoughts);

});