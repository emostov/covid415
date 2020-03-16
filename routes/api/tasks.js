const express = require('express');
const passport = require('passport');

const router = express.Router();
const validateTaskInput = require('../../validation/tasks');
const Task = require('../../models/Task');

router.get('/test', (req, res) => res.json({ msg: 'This is the tasks route' }));

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // request object now has a user key on it that is current user - based on jwt

    const { isValid, errors } = validateTaskInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    const { 
        type, body, deliveryAddress, deliveryInstructions, 
        requester, volunteer, status 
    } = req;

    const newTask = new Task({
      type,
      body,
      deliveryAddress,
      deliveryInstructions,
      requester,
      volunteer,
      status
    });

    newTask
      .save()
      .then((task) => res.json(task))
      .catch((err) => res.json(err));
  });

router.get('/', (req, res) => {
  Task
    .find()
    .sort({ createdAt: -1 })
    .then((t) => res.json(t))
    .catch((err) => res.status(400).json(err));
});

// router.get('/user/:user_id', (req, res) => {
//   Task
//     .find({ user: req.params.user_id })
//     .then((tasks) => res.json(tasks))
//     .catch((err) => res.status(400).json(err));
// });

router.get('/:id', (req, res) => {
  Tweet.findById(req.params.id)
    .then((tweets) => res.json(tweets))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
