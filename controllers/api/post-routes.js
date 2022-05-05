const router = require('express').Router();
const { Post, User } = require('../../models');
//Mental note: Why include User? In a query to the post table,
// we would like to retrieve not only information about each post, 
//but also the user that posted it. With the foreign key, user_id,
// we can form a JOIN, an essential characteristic of the relational data model.

// get all users
router.get('/', (req, res) => {
    Post.findAll({
      attributes: ['id', 'meal_desc', 'calories', 'user_id'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'meal_desc', 'calories', 'user_id'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'NOPE! WRONG! YOU LOSE! :)' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  ////May not use?
  /*router.delete('/:id', (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });*/

  module.exports = router;