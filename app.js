const express = require('express');
const mongoose = require('mongoose');



const port = process.env.PORT || 5000;

const app = express();
const db = require('./config/keys').mongoURI;
//Connect database using mongoose
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
app.listen(port, () => console.log(`Server is running on port ${port}`));

// Setup base API routes
// const users = require('./routes/api/users');
// app.use('/api/users', users);

app.get('/', (req, res) => res.send('Hello Wrld'));
