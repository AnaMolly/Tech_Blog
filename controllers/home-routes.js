const router = require('express').Router();
const { Post, Comment,User } = require('../models');


router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include:[{model:User}]
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
router.get('/dashboard', async (req, res) => {
  try {
    const dbpostData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      }, include:[{model:User}]
  });
  const posts = dbpostData.map((post) => post.get({ plain: true }));

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

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/homepage');
    return;
  }

  res.render('login');
});

router.get('/:id', async (req, res) => {
  try {
    const postDatas = await Post.findByPk(req.params.id, {include:[{model:User},{model:Comment}]});
    const post = postDatas.get({ plain: true })

  res.render('ind-post', {
    post,
    loggedIn: req.session.loggedIn,
  });
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/post/:id',   async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    const post = postData.get({ plain: true });
    console.log(post)
    res.status(200).render('editpost',{
      post,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});





module.exports = router;