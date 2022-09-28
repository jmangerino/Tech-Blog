const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res.status(400).json({ message: "Incorrect username or password." });
            return;
        }

        const validPassword = await userData.CheckPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: "Incorrect username or password." });
            return;
        };

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "Successfully logged in" });
        });

        } catch (err) {
            res.status(400).json(err);
        }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(200).json({ message: "Successfully logged out" });
        });
    } else {
        res.status(400).end();
    }
});

module.exports = router;