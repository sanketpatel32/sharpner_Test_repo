const express = require('express');
const path = require('path');
const sequelize = require('./utils/database');
const cors = require('cors');
const app = express();
const port = 3000;
const attendanceRoutes = require('./routes/attendanceRoute');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use('/attendance', attendanceRoutes);

// Start the server
sequelize.sync()
.then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})
.catch(err => {
  console.error('Error syncing database:', err);
});