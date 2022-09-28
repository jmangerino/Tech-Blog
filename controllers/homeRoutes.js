const router = require('express').Router();
const { User, Post, Comment } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({ include: [User] });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render("all-posts", { posts });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            include: [
                User, {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        if (!postData) {
            res.status(400).json({ message: "Error finding that post" });
        } else {
            const post = postData.get({ plain: true });
            res.render("single-post", { post });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }

    res.render("signup");
})

module.exports = router;