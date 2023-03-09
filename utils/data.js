const usersArr = [
    {username:'sam', email:'sam@example.com'},
    {username:'sally', email:'sally@example.com'},
    {username:'joe', email:'joe@test.com'},
    {username:'jane', email:'jane@test.com'},
    {username:'tom', email:'tom@gmail.com'},
    {username:'harry', email:'harry@gmail.com'},
    {username:'anu', email:'anu@hotmail.com'},
    {username:'ash', email:'ash@hotmail.com'},
    {username:'jamie', email:'jamie@example.com'},
    {username:'rusty', email:'rusty@hotmail.com'},
    {username:'sarah', email:'sarah@gmail.com'},
    {username:'emaily', email:'emily@test.com'},
    {username:'nalla', email:'nalla@example.com'},
    {username:'simba', email:'simba@test.com'},
    {username:'jerry', email:'jerry@gmail.com'},
    {username:'calvin', email:'calvin@hotmail.com'},
    {username:'hobbes', email:'hobbes@example.com'},
    {username:'niko', email:'niko@gmail.com'},
    {username:'kaju', email:'kaju@test.com'},
    {username:'xena', email:'xena@hotmail.com'},
    {username:'sam2', email:'sam2@example.com'},
    {username:'sally2', email:'sally2@example.com'},
    {username:'joe2', email:'joe2@test.com'},
    {username:'jane2', email:'jane2@test.com'},
    {username:'tom2', email:'tom2@gmail.com'},
    {username:'harry2', email:'harry2@gmail.com'},
    {username:'anu2', email:'anu2@hotmail.com'},
    {username:'ash2', email:'ash2@hotmail.com'},
    {username:'jamie2', email:'jamie2@example.com'},
    {username:'rusty2', email:'rusty2@hotmail.com'},
    {username:'sarah2', email:'sarah2@gmail.com'},
    {username:'emaily2', email:'emily2@test.com'},
    {username:'nalla2', email:'nalla2@example.com'},
    {username:'simba2', email:'simba2@test.com'},
    {username:'jerry2', email:'jerry2@gmail.com'},
    {username:'calvin2', email:'calvin2@hotmail.com'},
    {username:'hobbes2', email:'hobbes2@example.com'},
    {username:'niko2', email:'niko2@gmail.com'},
    {username:'kaju2', email:'kaju2@test.com'},
    {username:'xena2', email:'xena2@hotmail.com'},
];

const thoughtsArr = [
    'Decision Trackers are awesome',
    'Find My Phone is a useful app',
    'Learn Piano is not very good for learning Piano',
    'Starbase Defender is a great game, I love it',
    'Tower Defense is okay',
    'Monopoly Money is better than real money IMO',
    'Movie trailers are just the best parts of a movie distilled into 90 seconds',
    'Hello world, this is a comment',
    'Social media is a big waste of time',
    'Notes is my most used app',
    'Messages is open on my computer 24/7',
    'Email is open on my computer',
    'Compass is never opened',
    'Firefox is great for privacy',
    'Bootcamp is fun',
    'Coding is great',
    'Naatu Naatu is one fun song',
    'kdramas are so good',
    'No good movies these days',
    'There is another atmospheric river on our way!',
];

const reactionsArr = [
    'awesome!',
    'great',
    'oh no!',
    'wow!',
    'I agree!',
    'Count me out',
    'Count me in',
    'see you around',
    'sounds good',
    'thanks',
    'farewell',
    'bon voyage',
    'horrible',
    'let\'s go!',
    'I don\'t agree',
    'yikes',
    'really?',
    'I will be tere',
    'lol',
    'hahaha',
    'Fighting!'
];


// Function to generate random reaction 
const getReaction = (i) => {
    return reactionsArr[i];
};

// Function to generate random username 
const getUser = (i) => {
    return usersArr[i];
};

// Function to generate random username 
const getThought = (i) => {
    return thoughtsArr[i];
};

// Export the functions for use in seed.js
module.exports = {
    getThought,
    getReaction,
    getUser,
  };

