const router = require('express').Router();
const { Post, User } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [User]
        });

        const posts = postData.map((post) =>post.get({ plain: true }));

        res.render("all-posts-admin", {
            layout: "dashboard",
            posts
        });
    } catch (err) {
        res.status(500).json(err);
        res.redirect("login");
    }
})

router.get('/new', withAuth, (req, res) => {
    res.render("new-post", {
        layout: "dashboard"
    });
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (!postData) {
            res.status(400).end();
        } else {
            const post = postData.get({ plain: true });
            res.render("edit-post", {
                layout: "dashboard",
                post
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;