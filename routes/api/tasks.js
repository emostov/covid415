const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Task = require('../../models/Task');
const validateTaskInput = require('../../validation/tasks');

import parseAddress from '../../frontend/src/util/geocode_util';

router.get("/test", (req, res) => res.json({ msg: "This is the tasks route" }));

router.get('/', (req, res) => {
    Task.find()
        .sort({ createdAt: -1 })
        .then(tasks => res.json(tasks))
        .catch(err => res.status(404).json({ notasksfound: 'No tasks found' }));
});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateTaskInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const newTask = new Task ({
        type: req.body.type,
        details: req.body.details,
        requester: req.user.id,
        deliveryAddress: req.body.deliveryAddress,
        deliveryLatLong: parseAddress(deliveryAddress),
        deliveryInstructions: req.body.deliveryInstructions
      });
  
      newTask.save().then(task => res.json(task));
    }
  );

module.exports = router;