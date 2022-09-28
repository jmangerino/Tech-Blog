const { Post } = require('../models');

const postData = [
    {
        title: "Testing",
        post_content: "Testing 1",
        user_id: 1
    },
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;