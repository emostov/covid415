const validText = require('./valid-text');

module.exports = function validateTaskInput(dat) {
  const errors = {};
  const data = { ...dat }; // Clone so we don't manipulate arguments

  data.type = validText(data.type) ? data.type : '';
  data.body = validText(data.body) ? data.body : '';
  data.deliveryAddress = validText(data.deliveryAddress) ? data.deliveryAddress : '';
  data.deliveryInstructions = validText(data.deliveryInstructions) ? data.deliveryInstructions : '';

  if (Validator.isEmpty(data.type)) {
    errors.text = 'Please select a task type.';
  }

  if (Validator.isEmpty(data.body)) {
    errors.text = 'Request detail is required.';
  }
  
  if (!Validator.isLength(data.body, { min: 100})) {
    errors.text = 'Request detail should be at least 100 characters. Please provide more details so that your volunteer has enough information to help.';
  }

  if (Validator.isEmpty(data.deliveryAddress)) {
    errors.text = 'Delivery address is required.';
  }

  if (Validator.isEmpty(data.deliveryInstructions)) {
    errors.text = 'Delivery instructions are required.';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};