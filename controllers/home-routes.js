const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Goal } = require('../models');

router.get('/', (req, res) => {
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
  });
});

/* router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'meal_desc',
      'calories',
      'user_id',
// Goal? [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_co
    ],
    include: [
      {
        model: Post,
        attributes: ['id', 'meal_desc', 'calories', 'user_id'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('homepage', { posts });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}); */

router.get('/login', (req, res) => {
  if (req.session.loggedIn) { // if already logged in. Add logout first before uncommenting
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

module.exports = router;
