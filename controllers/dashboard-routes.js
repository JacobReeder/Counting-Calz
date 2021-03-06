const router = require('express').Router();
const { Post, Goal } = require('../models');

router.get('/', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  Post.findAll({
    order: [['created_at', 'DESC']],
    where: {
      user_id: req.session.user_id,
    },
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      Goal.findOne({
        where: {
          user_id: req.session.user_id,
        },
      })
        .then((dbPostData2) => {
          const goal = dbPostData2;
          // console.log(goal);
          res.render('dashboard', {
            posts,
            goal,
            loggedIn: req.session.loggedIn,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
