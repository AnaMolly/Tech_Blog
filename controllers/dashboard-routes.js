const router = require('express').Router();
const { User, Post} = require('../models')

router.get('/', async (req, res) => {
  
    try {
      const postData = await Post.findAll({
        where: {
          user_id: req.session.user_id
        }, include:{model:User}
    });
    console.log(postData)
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(400).json({ message: 'You must be logged in first!' });
  }
});

router.get('/addpost', async (req, res) => {
  try {
  res.render('addpost', {
    loggedIn: req.session.loggedIn
  });
} catch (err) {
  res.status(400).json(err);
}
});


router.get('/:id', async (req, res) => {
    try {
      const postData = await Post.findOne(
        {
      where: {
        id: req.params.id
      }});
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;