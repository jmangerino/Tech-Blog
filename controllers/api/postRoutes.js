const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({ 
            ...req.body, 
            user_id: req.session.user_id
        });
        
        if (!postData) {
            res.status(400).json({ message: "Error with creating the Post" });
        } else {
            res.status(200).json(postData);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.update({
            where: {
                id: req.params.id,
            },
        });

        if (!postData) {
            res.status(400).json({ message: "error with updating the Post" });
        } else {
            res.status(200).json(postData);
        };
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });

        if (!postData) {
            res.status(400).json({ message: "Error deleting the Post" });
        } else {
            res.status(200).json(postData);
        };
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;