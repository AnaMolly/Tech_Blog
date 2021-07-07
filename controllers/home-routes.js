const router = require('express').Router();
const { Post, Comment } = require('../models');


router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll();
      const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  res.render('login');
});



module.exports = router;