const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Goal  } = require('../models');

router.get('/', (req, res) => {
  console.log(req.session);
    res.render('homepage', {
      id: 1,
      meal_desc: '',
      calories: '',
      user_id: '',

      user: {
        username: 'test_user'
      }
    });
  });

  /*router.get('/', (req, res) => {
    Post.findAll({
      attributes: [
        'id',
        'meal_desc',
        'calories',
        'user_id',
  ///Goal?      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
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
  });*/

  /*router.get('/post/:id', (req, res) => { ////Module code with mock test info. Replace with our Post models attributes and mock a test post
    const post = {
      id: 1,
      post_url: 'https://handlebarsjs.com/guide/',
      title: 'Handlebars Docs',
      created_at: new Date(),
      vote_count: 10,
      comments: [{}, {}],
      user: {
        username: 'test_user'
      }
    };
  
    res.render('single-post', { post });
  });*/

  router.get('/login', (req, res) => {
   /* if (req.session.loggedIn) {  /////if already logged in. Add logout first before uncommenting
      res.redirect('/');
      return;
    }*/
    res.render('login');
  });

module.exports = router;
