const router = require("express").Router()
//const sequelize = require("../config/connection")
const { Post, User, Comment } = require("../models")
const withAuth = require("../utils/auth")


router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll().catch((err) => {
      res.json(err)
    })
    const userPost = postData.filter(
      (post) => post.user_id === req.session.user_id
    )
    const Post = userPost.map((post) => post.get({ plain: true }))

    res.render("dashboard", {
      Post,
      loggedIn: req.session.loggedIn,
    })
  } catch (err) {
    console.log(err)
  }
})


router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id)

    const post = postData.get({ plain: true })

    res.render("dashboard", {
      ...post,
      loggedIn: req.session.loggedIn,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;