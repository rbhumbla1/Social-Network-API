const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate([{ path: 'thoughts', select: "-__v" }, { path: 'friends', select: "-__v" }])
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    //update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(course)
            )
            .catch((err) => res.status(500).json(err));
    },
    //Delete a user
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No such user exists' })
                } else {
                    for (let i = 0; i < user.thoughts.length; i++) {
                        if (user.username === thoughts[i].username) {
                            Thought.findOneAndRemove({ _id: thoughts[i]._id })
                            // .then((thought) =>
                            //     !thought
                            //         ? res.status(404).json({
                            //             message: 'User deleted, but no thoughts found',
                            //         })
                            //         : res.json({ message: 'User successfully deleted' })
                            // )

                        }
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

};
