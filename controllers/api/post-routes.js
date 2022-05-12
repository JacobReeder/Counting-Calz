const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
  Post.findAll({
    order: [['created_at', 'DESC']],
    attributes: [
      'id',
      'meal_desc',
      'calories',
      'date_time',
      'user_id',
      'created_at',
    ],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'meal_desc', 'calories', 'date_time', 'user_id'],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'NOPE! WRONG! YOU LOSE! :)' });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  Post.create({
    meal_desc: req.body.mealDesc,
    calories: parseInt(req.body.calories, 10),
    date_time: req.body.dateTime,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// May not use?
/* router.put('/:id', (req, res) => {
   Post.update(
     {
       title: req.body.title
     },
     {
       where: {
         id: req.params.id
       }
     }
   )
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
 }); */

// May not use?
/* router.delete('/:id', (req, res) => {
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
}); */

module.exports = router;
