const router = require('express').Router();
const { Post } = require('../../models');
//const withAuth = require ('../../utils/auth')

router.post('/', async (req, res) => {
      try {
        const postData = await Post.create({
            post_title: req.body.post_title,
            post_content: req.body.post_content,
            user_id: req.session.user_id
        });
        req.session.save(() => {
          req.session.loggedIn = true;  
        });
        res.status(200).json(postData);
      } catch (err) {
        res.status(400).json(err);
      }
});



router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update({
        post_title: req.body.post_title,
        post_content: req.body.post_content
    },{
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

router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id
      },
    });
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