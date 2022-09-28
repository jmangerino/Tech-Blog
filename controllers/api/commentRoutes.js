const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({ 
            ...req.body, 
            user_id: req.session.user_id
        });
        
        if (!commentData) {
            res.status(400).json({ message: "Error with creating the Comment" });
        } else {
            res.status(200).json(commentData);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update({
            where: {
                id: req.params.id,
            },
        });

        if (!commentData) {
            res.status(400).json({ message: "error with updating the Comment" });
        } else {
            res.status(200).json(commentData);
        };
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });

        if (!commentData) {
            res.status(400).json({ message: "Error deleting the Comment" });
        } else {
            res.status(200).json(commentData);
        };
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;