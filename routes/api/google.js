/* eslint-disable consistent-return */
/* eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
const express = require('express');
const passport = require('passport');
const axios = require('axios');

const { distanceMatrixKey } = require('../../config/keys');

const router = express.Router();
// The idea behind this file is that there is to call the google matrix API,
// and receive the distance between to coordinates. The only issue that we I am
// running into is receiving an empty object as the data response.
// 1. could be the CORS policy that isnt getting accepted
// 2. It could also be an error on how we are receiving the data in some way

// If you want to get this running dont forget to comment back in the route
// in app.js that this accesses.
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
