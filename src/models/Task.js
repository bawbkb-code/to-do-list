const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Sprint = require('./Sprint');
const Project = require('./Project');

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

Sprint.hasMany(Task);
Task.belongsTo(Sprint, {
  foreignKey: 'SprintId',
  allowNull: true,
});

Project.hasMany(Task);
Task.belongsTo(Project);

module.exports = Task;
