/* eslint-disable no-console */
const geocodeUtil = require('../util/geocode_util');
const Task = require('../models/Task');
const User = require('../models/User');

const {
  firstNames,
  lastNames,
  deliveryInstructions,
  details,
  addresses,
} = require('./seed_data.js');

const generateUserObjs = (n) => {
  const users = [];

  for (let i = 0; i < n; i += 1) {
    const r = Math.floor(Math.random() * 10000);
    const newUser = {
      firstName: firstNames[r % (firstNames.length - 1)],
      lastName: lastNames[r % lastNames.length],
      email: `randEmail${i + r}@gmail.com`,
      password: 'password',
    };

    users.push(newUser);
  }
  return users;
};

const types = ['food', 'medicine', 'other'];

const seedUsersAndTasks = (n) => {
  const results = [];
  const users = generateUserObjs(n);
  for (let i = 0; i < users.length; i += 1) {
    const r = Math.floor(Math.random() * 1000);
    const newUser = new User(users[i]);
    const deliverAdd = addresses[r % addresses.length];
    newUser.save()
      .then((savedUser) => {
        results.push(savedUser);
        geocodeUtil.parseAddress(deliverAdd)
          .then((gMapsResponse) => {
            results.push(gMapsResponse);
            const taskObj = {
              requester: savedUser,
              status: 0,
              type: types[r % 3],
              details: details[r % details.length],
              deliveryInstructions: deliveryInstructions[r % deliveryInstructions.length],
              deliveryAddress: deliverAdd,
              deliveryLatLong: Object.values(gMapsResponse.data.results[0].geometry.location),
              deliveryNeighborhood: gMapsResponse.data.results[0].address_components[2].short_name,
            };
            const newTask = new Task(taskObj);
            results.push(taskObj);
            newTask.save()
              .then((t) => console.log(t));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
  return results;
};

seedByAddress = () => {
  const users = generateUserObjs(n);
  const results = [];
  for (let i = 0; i < addresses.length; i += 1) {
    const r = Math.floor(Math.random() * 1000);
    const newUser = new User(users[i]);
    const deliverAdd = addresses[i];
    newUser.save()
      .then((savedUser) => {
        results.push(savedUser);
        geocodeUtil.parseAddress(deliverAdd)
          .then((gMapsResponse) => {
            results.push(gMapsResponse);
            const taskObj = {
              requester: savedUser,
              status: 0,
              type: types[r % 3],
              details: details[r % details.length],
              deliveryInstructions: deliveryInstructions[r % deliveryInstructions.length],
              deliveryAddress: deliverAdd,
              deliveryLatLong: Object.values(gMapsResponse.data.results[0].geometry.location),
              deliveryNeighborhood: gMapsResponse.data.results[0].address_components[2].short_name,
            };
            const newTask = new Task(taskObj);
            results.push(taskObj);
            newTask.save()
              .then((t) => console.log(t));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
  return results;
}


module.exports = { seedUsersAndTasks };
