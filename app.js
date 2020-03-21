const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');


const users = require('./routes/api/users');
const tasks = require('./routes/api/tasks');
const google = require('./routes/api/google');
const { seedUsersAndTasks, seedByAddress } = require('./seeds/seed_script');

const port = process.env.PORT || 5000;

const app = express();

// Load static build folder in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const db = require('./config/keys').mongoURI;
// Connect database using mongoose
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.log(err));

// Setup middlware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);

// Setup base routes
app.use('/api/users', users);
app.use('/api/tasks', tasks);
app.use('/api/google', google);
app.get('/', (req, res) => res.send('Light on the back side'));
app.get('/seed', (req, res) => {
  // res.send(seedUsersAndTasks(10));
  seedByAddress();
  res.send('seemsToHaveWorked');
});

// Lastly, setup our app to listen
app.listen(port, () => console.log(`Server is running on port ${port}`));
