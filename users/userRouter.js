const express = require('express');
const userDb = require('./userDb')
const postDb = require('../posts/postDb')
const {
  validateUserId,
  validateUser,
  validatePost } = require('../middleware/user');

const router = express.Router();

router.post('/users', validateUser(), (req, res) => {
  userDb.insert(req.body)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((error) => {
      next(error)
    })
  // do your magic!
});

router.post('/user/:id/posts', validateUserId(), validatePost(), (req, res) => {
 postDb.insert(req.params.id, req.body)
  .then((post) => {
    res.status(200).json(post)
  }) 
  .catch((error) => {
    next(error)
  })
  // do your magic!
});

router.get('/users', (req, res) => {
  userDb.get()
    .then((user) => {
      res.status(200).json(users)
    })
    .catch((error) => {
      next(error)
    })
  // do your magic!
});

router.get('/users/:id', validateUserId(), (req, res) => {
  res.status(200).json(users)

  // do your magic!
});

router.get('/users/:id/posts', validateUserId(), (req, res) => {
  userDb.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch(() => {
      next(error)
    })
  // do your magic!
});

router.delete('/users/:id', validateUserId(), (req, res) => {
  userDb.remove(req.params.id)
    .then((posts) => {
      res.status(200).json({
        message: 'The user has been deleted'
      })
    })
    .catch((error) => {
      next(error)
    })
  // do your magic!
});

router.put('/users/:id', validateUserId(), validateUser(), (req, res) => {
  userDb.update(req.params.id, req.body)
    .then(() => {
      res.status(200).json({
        message: 'The user name has been successfully changed'
      })
    })
    .catch((error) => {
      next(error)
    })
  // do your magic!
});

//custom middleware

// function validateUserId(req, res, next) {
//   // do your magic!
// }

// function validateUser(req, res, next) {
//   // do your magic!
// }

// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = router;
