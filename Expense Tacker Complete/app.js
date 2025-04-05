const express = require('express');
const path = require('path');
const cors = require('cors');
const sequelize = require('./utils/database');
const app = express();
const port = 3000;
const User = require('./models/userModel');
const Expense = require('./models/expenseModel');

User.hasMany(Expense, { foreignKey: 'userId', onDelete: 'CASCADE' });
Expense.belongsTo(User, { foreignKey: 'userId' });

const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

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
app.use('/expense', expenseRoutes)
app.use('/pay', paymentRoutes);

sequelize.sync({force: true}) // Set force to true only for development/testing purposes
.then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})
.catch(err => {
  console.error('Error syncing database:', err);
});
