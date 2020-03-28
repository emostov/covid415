const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(dat) {
  const errors = {};
  const data = { ...dat };

  data.firstName = validText(data.firstName) ? data.firstName : '';
  data.lastName = validText(data.lastName) ? data.lastName : '';
  data.email = validText(data.email) ? data.email : '';
  data.phoneNumber = validText(data.phoneNumber) ? data.phoneNumber : '';
  data.password = validText(data.password) ? data.password : '';
  data.password2 = validText(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.firstName, { min: 1, max: 30 })) {
    errors.firstName = 'First name must be between 1 and 30 characters';
  }

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First name field is required';
  }

  if (!Validator.isLength(data.lastName, { min: 1, max: 30 })) {
    errors.lastName = 'Last name must be between 1 and 30 characters';
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = 'Phone Number field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};