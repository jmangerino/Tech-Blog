const { User } = require('../models');

const userData = [
    {
        username: "joshMan",
        email: "joshMan@gmail.com",
        password: "password"
    },
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;