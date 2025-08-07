const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sprint = sequelize.define('Sprint', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Sprint;
