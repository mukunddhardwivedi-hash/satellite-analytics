const sequelize = require('../config/database');
const User = require('./User');
const SatelliteData = require('./SatelliteData');
const NaturalEvent = require('./NaturalEvent');
const SavedLocation = require('./SavedLocation');
const Analysis = require('./Analysis');

// Define associations
User.hasMany(SavedLocation, { foreignKey: 'userId', onDelete: 'CASCADE' });
SavedLocation.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Analysis, { foreignKey: 'userId', onDelete: 'CASCADE' });
Analysis.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  SatelliteData,
  NaturalEvent,
  SavedLocation,
  Analysis
};
