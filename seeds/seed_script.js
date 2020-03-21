/* eslint-disable no-console */
// const axios = require('axios');
const geocodeUtil = require('../util/geocode_util');
const Task = require('../models/Task');
const User = require('../models/User');
const db = require('../config/keys').mongoURI;

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
    const r = Math.floor(Math.random() * 1000);
    const newUser = {
      firstName: firstNames[r % (firstNames.length - 1)],
      lastName: lastNames[r % lastNames.length],
      email: `randEmail${i}@gmail.com`,
      password: 'password',
    };

    users.push(newUser);
  }
  return users;
};

const types = ['food', 'medicine', 'other'];

const seedUsersAndTasks = (n) => {
  User.remove({});
  Task.remove({});
  const results = [];
  const users = generateUserObjs(n);
  for (let i = 0; i < users.length; i += 1) {

    const r = Math.floor(Math.random() * 1000);
    const newUser = new User(users[i]);
    const deliverAdd = addresses[r % addresses.length];
    newUser.save()
      .then((savedUser) => {
        console.log('hi');
        console.log(savedUser);
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
            // console.log(taskObj);
            const newTask = new Task(taskObj);
            results.push(taskObj);
            newTask.save()
              .then((t) => results.push(t));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
  return results;
};

console.log(seedUsersAndTasks(3));

module.exports = { seedUsersAndTasks };
