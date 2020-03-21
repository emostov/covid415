{
  firstNames,
  lastNames,
  deliveryInstructions,
  details,
  addresses,
  } = require('./seed_data.js');

const generateUserObjs = () => {
  cosnt users = [];
  for (let i = 0, i < addresses.length, i += 1) {
    const r = Math.floor(Math.random * 1000);
    const newUser = {
      firstName: firstNames[r % firstNames.length],
      lastName: lastNames[r % lastNames.length],
      email: `randEmail${i}@gmail.com`,
      password: 'password'
    };

    users.push(newUser);
  }
  return users
}