const router = require('express').Router();
const { Post, Comment } = require('../models');


router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll();
      const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts
      //loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
  

module.exports = router;