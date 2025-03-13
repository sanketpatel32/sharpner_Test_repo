const express = require('express');
const app = express();
const port = 3000;

// Custom middleware function to add req.user property
const addUserProperty = (req, res, next) => {
  req.user = 'Guest';
  next();
};

// Apply the middleware to the /welcome route
app.use('/welcome', addUserProperty);

// Route handler for /welcome
app.get('/welcome', (req, res) => {
  res.send(`<h1>Welcome, ${req.user}!</h1>`);
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}! Ready to handle requests.`);
});