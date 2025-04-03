const express = require('express');
const path = require('path');
const cors = require('cors');
const sequelize = require('./utils/database');
const app = express();
const port = 3000;

const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

//Routes
app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);


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