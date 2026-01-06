require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const { swaggerUi, specs } = require('./config/swagger');
const courseRouter = require('./router/courseRouter');
const categoryRouter = require('./router/categoryRouter');
const authRouter = require('./router/authRouter');
const statsRouter = require('./router/statsRouter');

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
app.use('/auth', authRouter);
app.use('/stats', statsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);

  // Affiche l'erreur que sur la page de Login et Register
  if("/auth/login" === req.path || "/auth/register" === req.path) {
    res.status(err.status).send(err.message);
  } else {
    res.status(err.status).send("Something broke !");
  }
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
