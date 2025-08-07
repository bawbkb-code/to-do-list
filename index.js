require('dotenv').config(); // Load environment variables from .env file

const app = require('./src/app');
const sequelize = require('./src/config/database');

const port = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await sequelize.sync(); // Sync all models
    console.log('Database synchronized successfully.');

    app.listen(port, () => {
      console.log('Listening on port: ' + port);
    });
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

startServer();
