const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Analysis = sequelize.define('Analysis', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  analysisType: {
    type: DataTypes.ENUM('comparison', 'trend', 'classification', 'change_detection', 'custom'),
    allowNull: false
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  parameters: {
    type: DataTypes.JSON,
    allowNull: true
  },
  results: {
    type: DataTypes.JSON,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'completed', 'failed'),
    defaultValue: 'pending'
  },
  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  errorMessage: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  }
}, {
  timestamps: true,
  tableName: 'analyses',
  indexes: [
    { fields: ['userId'] },
    { fields: ['status'] }
  ]
});

module.exports = Analysis;
