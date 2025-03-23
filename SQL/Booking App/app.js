const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.use('/user', userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})