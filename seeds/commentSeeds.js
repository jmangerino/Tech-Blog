const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "Testing",
        user_id: 2,
        post_id: 1
    },
    {
        comment_text: "Still Testing",
        user_id: 3,
        post_id: 1
    },
    {
        comment_text: "Hopefully this works",
        user_id: 1,
        post_id: 1
    }
]





const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
