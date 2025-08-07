const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Task = sequelize.define('Task', {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'To Do' // e.g., "To Do", "In Progress", "Done"
  }
});

// Associations
User.hasMany(Task);
Task.belongsTo(User);

module.exports = Task;
