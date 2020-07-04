/* eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
const express = require('express');
const passport = require('passport');

const  { 
    twilioAccountSid,
    twilioAuthToken,
    twilioPhoneNumber
} = require('../../config/keys');
const client = require('twilio')(twilioAccountSid, twilioAuthToken);

const router = express.Router();

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
    res.header('Content-Type', 'application/json');
    client.messages
        .create({
            from: twilioPhoneNumber,
            to: `+1${req.body.phoneNumber}`,
            body: `Good news! Your neighbor ${req.body.volunteerName} has agreed to deliver your items. They have your contact info and will follow up soon.\n\nStay safe!\n ❤️ COVID415 team`
        })
        .then(() => {
            res.send({ success: true });
        })
        .catch(err => {
            console.log(err);
            res.send(({ success: false }));
        });
});

module.exports = router;