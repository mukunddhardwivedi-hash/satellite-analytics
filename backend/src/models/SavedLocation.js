const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SavedLocation = sequelize.define('SavedLocation', {
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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  boundingBox: {
    type: DataTypes.JSON,
    allowNull: true
  },
  zoomLevel: {
    type: DataTypes.INTEGER,
    defaultValue: 10
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: '#FF5733'
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  viewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
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
  tableName: 'saved_locations',
  indexes: [
    { fields: ['userId'] },
    { fields: ['isPublic'] }
  ]
});

module.exports = SavedLocation;
