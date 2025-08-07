const { Sequelize } = require('sequelize');
require('dotenv').config();

// Ensure that the required environment variables are set
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set.');
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: process.env.DB_SSL === 'true' ? { require: true, rejectUnauthorized: false } : false
  }
});

module.exports = sequelize;
