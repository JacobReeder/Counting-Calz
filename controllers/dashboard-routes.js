const router = require('express').Router();
const { Post, Goal } = require('../models');

router.get('/', (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    // if no session user id, document.location.replace(/)
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
