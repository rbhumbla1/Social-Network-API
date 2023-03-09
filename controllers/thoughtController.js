const { Thought, Reaction } = require('../models');

module.exports = {
    //get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => { console.log(thoughts); res.json(thoughts) })
            .catch((err) => res.status(500).json(err));
    },
    //get single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .populate({ path: 'reactions', select: "-__v" })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'Thought created, but found no user with that ID' })
                    : res.json('Created the thought 🎉')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    //Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    //add a reaction
    addReaction(req, res) {
        console.log('You are adding an reaction');
        console.log(req.body);
        Reaction.create(req.body)
            .then((reaction) => {
                if (!reaction)
                    res.status(404).json({ message: 'Reaction failed in creation' })
                else {
                    Thought.findOneAndUpdate(
                        { _id: req.params.thoughtId },
                        { $addToSet: { reactions: reaction },
                        { runValidators: true, new: true }
                    )
                    .then((thought) =>
                            !thought
                                ? res.status(404).json({ message: 'No thought with this id!' })
                                : res.json(thought)
                        )
                }
            })
            .catch((err) => res.status(500).json(err));
    },
    //remove a reaction
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res
                .status(404)
                .json({ message: 'No thought found with that ID :(' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },

};
