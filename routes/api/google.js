/* eslint-disable consistent-return */
const express = require('express');
const passport = require('passport');
const axios = require('axios');

const { distanceMatrixKey } = require('../../config/keys');

const router = express.Router();

router.post('/distancematrix',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // No validation for now
    const { finalOri, finalDest } = req.body;
    axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${finalOri}&destinations=${finalDest}&key=${distanceMatrixKey}`)
      .then((googleRes) => {
        console.log(googleRes);
        res.json(googleRes);
      })
      .catch((err) => res.json(err));
  });

module.exports = router;
