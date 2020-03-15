const express = require("express");

// Set port to production env or 5000 for dev
const port = process.env.PORT || 5000;

// Create Express app instance
const app = express();

// Tell app to run on port variable defined earlier
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.get("/", (req, res) => res.send("Hello World"));