const router = require('express').Router();
const { User, Goal } = require('../../models');

// get the goal
router.get('/:id', (req, res) => {
  Goal.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'calorie_goal', 'user_id'],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No can do' });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // expects {calorie_goal: 3200, user_id: 1}
  Goal.create({
    calorie_goal: parseInt(req.body.calorie_goal, 10),
    user_id: req.body.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Goal.update(
    {
      calorie_count: req.body.calorie_count,
    },
    {
      where: {
        id: req.params.id,
      },
    },
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No can do' });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
