const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SatelliteData = sequelize.define('SatelliteData', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  dataType: {
    type: DataTypes.ENUM('NDVI', 'temperature', 'rainfall', 'landuse', 'other'),
    allowNull: false
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false
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
  value: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: true
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  source: {
    type: DataTypes.ENUM('NASA', 'Copernicus', 'USGS', 'OpenWeatherMap', 'other'),
    allowNull: false
  },
  acquisitionDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  cloudCover: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  tableName: 'satellite_data',
  indexes: [
    { fields: ['region', 'acquisitionDate'] },
    { fields: ['dataType', 'acquisitionDate'] },
    { fields: ['latitude', 'longitude'] }
  ]
});

module.exports = SatelliteData;
