const router = require('express').Router();
const {
  createReaction,
  removeREaction
} = require('../../controllers/reactionController');


// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
