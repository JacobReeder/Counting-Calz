const router = require('express').Router();
const { User, Goal } = require('../../models');
const withAuth = require('../../utils/auth');

// get the goal
// shouldn't need this route, -tneswick
// router.get('/', (req, res) => {
//   Goal.findOne({
//     where: {
//       id: req.params.id,
//     },
//     attributes: ['id', 'calorie_goal', 'user_id'],
//     include: [
//       {
//         model: User,
//         attributes: ['username'],
//       },
//     ],
//   })
//     .then((dbPostData) => {
//       if (!dbPostData) {
//         res.status(404).json({ message: 'No can do' });
//         return;
//       }
//       res.json(dbPostData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.post('/', withAuth, (req, res) => {
  // expects {calorie_goal: 3200, user_id: 1}
  Goal.create({
    id: req.session.user_id,
    calorie_goal: req.body.newGoalPost,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/1', (req, res) => {
  console.log(req.body.newGoalVal);
  Goal.update(
    {
      calorie_goal: req.body.newGoalVal,
    },
    {
      where: {
        id: req.session.user_id,
      },
    },
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No can do' });
        return;
      }
      console.log('Backend Successful');
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log('UPDATE FAILED \n =================');
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
