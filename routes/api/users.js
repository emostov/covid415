/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const keys = require('../../config/keys');
const User = require('../../models/User');


const router = express.Router();

router.get('/test', (req, res) => res.json({ msg: 'This is the users route' }));

// Register and create a first time user
router.post('/register', (req, res) => {
  // This will do all validations, including matching passwords
  const { errors, isValid } = validateRegisterInput(req.body);
  
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        // The user is trying to sign up with an email that already exists
        errors.email = 'Email already in use';
        return res.status(400).json(errors);
      }
      const {
        firstName, lastName, email, phoneNumber, password,
      } = req.body;

      const newUser = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then((user) => {
              const payload = { id: user.id, handle: user.handle };
              // Expire token after 24 hours
              jwt.sign(payload, keys.secretOrKey, { expiresIn: 60 * 60 * 24 },
                (err, token) => {
                  if (err) res.json(err);
                  res.json({
                    success: true,
                    token: `Bearer ${token}`,
                  });
                });
            })
            .catch((err) => console.log(err));
        });
      });
    });
});

// Login a user that has an existing account
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        errors.email = 'User with that email not found';
        return res.status(404).json(errors);
      }

      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            // Add any fields of the user we want in payload
            const {
              id, email, firstName, phoneNumber, lastName,
            } = user;
            const payload = {
              id, email, firstName, phoneNumber, lastName,
            };

            jwt.sign(
              payload,
              keys.secretOrKey,
              // Tell the key to expire in one day
              { expiresIn: 60 * 60 * 24 },
              (err, token) => {
                if (err) res.json(err);
                res.json({
                  success: true,
                  token: `Bearer ${token}`,
                });
              },
            );
          } else {
            errors.password = 'Incorrect password';
            return res.status(400).json(errors);
          }
        });
    });
});

// Current user authentication - succesful when header contains correct jwt
// In header key:Authorization value:Bearer+' '+jwt
router.get('/current',
  passport.authenticate('jwt', { session: false }), (req, res) => {
    const {
      id, email, firstName, lastName, phoneNumber
    } = req.user;
    res.json({
      id,
      email,
      firstName,
      lastName,
      phoneNumber
    });
  });


module.exports = router;
