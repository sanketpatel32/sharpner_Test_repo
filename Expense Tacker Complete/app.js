const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();
const fs = require('fs');
const sequelize = require('./utils/database');
const User = require('./models/userModel');
const Expense = require('./models/expenseModel');
User.hasMany(Expense, { foreignKey: 'userId', onDelete: 'CASCADE' });
Expense.belongsTo(User, { foreignKey: 'userId' });

const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const passwordRoutes = require('./routes/passwordRoutes');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(helmet());
app.use(compression());
app.use(morgan('combined',{stream: accessLogStream}));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


//Routes
app.use('/user', userRoutes);
app.use('/expense', expenseRoutes)
app.use('/pay', paymentRoutes);
app.use('/password',passwordRoutes)

sequelize.sync({force : false}) // Set force to true only for development/testing purposes
.then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
  });
})
.catch(err => {
  console.error('Error syncing database:', err);
});
