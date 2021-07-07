const router = require('express').Router();
const { Post, Comment,User } = require('../models');


router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include:[{model:User, attributes:['username']}]
      });
      const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id',   async (req, res) => {
  try {
    const PostData = await Post.findByPk(req.params.id);
    const post = PostData.get({ plain: true });
    console.log(post)
    res.status(200).render('editpost',{post})
  } catch (err) {
    console.log(err);
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