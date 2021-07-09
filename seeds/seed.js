  
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const user_data = require('./user-data.json');
const post_data = require('./post-data.json');
const comment_data = require('./comment-data.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user = await User.bulkCreate(user_data, {
    individualHooks: true,
  });

  const post = await Post.bulkCreate(post_data);

  const comment = await Comment.bulkCreate(comment_data);

  process.exit(0);
};

seedDatabase();