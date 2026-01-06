require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const associations = require('./config/associations');
const { swaggerUi, specs } = require('./config/swagger');
const courseRouter = require('./router/courseRouter');
const categoryRouter = require('./router/categoryRouter');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/courses', courseRouter);
app.use('/categories', categoryRouter);

// Auth routes will be added by colleague
// app.use('/auth', authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Sync database and start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      'Connection to the database has been established successfully.'
    );

    await sequelize.sync({ force: false }); // Set to true only for development to reset DB
    console.log('Database synchronized successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(
        `Swagger docs available at http://localhost:${PORT}/api-docs`
      );
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();

module.exports = app;
