/* eslint-disable no-param-reassign */
const express = require('express');
const passport = require('passport');

const geocodeUtil = require('../../util/geocode_util');
const Task = require('../../models/Task');
const validateTaskInput = require('../../validation/tasks');
const backendUtil = require('../../util/backend_util')

const router = express.Router();

router.get('/test', (req, res) => res.json({ msg: 'This is the tasks route' }));

router.get('/', (req, res) => {
  
  Task.find()
    .sort({ createdAt: -1 })
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(404).json({ notasksfound: 'No tasks found' }));
});

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTaskInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const unFrozenParser = backendUtil.pullKeys(req.user);

    geocodeUtil.parseAddress(req.body.deliveryAddress).then(
      (gMapsResponse) => {
        const newTask = new Task({
          type: req.body.type,
          details: req.body.details,
          requester: unFrozenParser,
          deliveryAddress: gMapsResponse.data.results[0].formatted_address,
          deliveryLatLong: Object.values(gMapsResponse.data.results[0].geometry.location),
          deliveryNeighborhood: gMapsResponse.data.results[0].address_components[2].short_name,
          deliveryInstructions: req.body.deliveryInstructions,
        });

        newTask.save()
          .then((task) => res.json(task))
          .catch(err => res.json(console.log(err)))
      },
    )
      .catch(err => res.json(err))
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTaskInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const {
      type,
      details,
      deliveryInstructions,
      status,
      volunteer,
    } = req.body;
    
    Task.findById(req.params.id)
      .then((task) => {
        task.type = type;
        task.status = status;
        task.details = details;
        task.deliveryInstructions = deliveryInstructions;
        task.volunteer = volunteer;

        task.save()
          .then((savedTask) => res.json(savedTask))
          // eslint-disable-next-line no-console
          .catch((err) => res.json(err));
      });
  }
);


module.exports = router;
