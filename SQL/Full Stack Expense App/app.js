// filepath: c:\Users\sanpa\Desktop\Sharpner\sharpner_Test_repo\SQL\Full Stack Expense App\app.js
const express = require('express');
const path = require('path');
const cors = require('cors'); // Import the cors package
const sequelize = require('./utils/database');
const expenseRoutes = require('./routes/expenses.routes');
const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use('/expense', expenseRoutes);

sequelize.sync()
.then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})
.catch(err => {
  console.error('Error syncing database:', err);
});