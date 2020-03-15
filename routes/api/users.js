const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const keys = require('../../config/keys');
const User = require('../../models/User');


const router = express.Router();

router.get('/test', (req, res) => res.json({ msg: 'This is the users route' }));

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
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      }
      const {
        firstName, lastName, email, password,
      } = req.body;

      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then((userSaved) => res.json(userSaved))
            .catch((errSave) => console.log(errSave));
        });
      });
    });
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }

      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            res.json({ msg: 'Success' });
          } else {
            // And here:
            errors.password = 'Incorrect password';
            return res.status(400).json(errors);
          }
        });
    });
});


module.exports = router;
