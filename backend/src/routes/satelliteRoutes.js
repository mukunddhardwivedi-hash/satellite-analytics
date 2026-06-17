const express = require('express');
const { SatelliteData } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const logger = require('../utils/logger');
const { Op } = require('sequelize');

const router = express.Router();

// Get satellite data by region and date range
router.get('/', async (req, res) => {
  try {
    const { region, startDate, endDate, dataType, source } = req.query;
    const where = {};

    if (region) where.region = region;
    if (dataType) where.dataType = dataType;
    if (source) where.source = source;
    if (startDate || endDate) {
      where.acquisitionDate = {};
      if (startDate) where.acquisitionDate[Op.gte] = new Date(startDate);
      if (endDate) where.acquisitionDate[Op.lte] = new Date(endDate);
    }

    const data = await SatelliteData.findAll({
      where,
      limit: parseInt(req.query.limit) || 100,
      offset: parseInt(req.query.offset) || 0,
      order: [['acquisitionDate', 'DESC']]
    });

    res.json(data);
  } catch (error) {
    logger.error('Error fetching satellite data:', error);
    res.status(500).json({ error: 'Failed to fetch satellite data' });
  }
});

// Get satellite data by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await SatelliteData.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({ error: 'Satellite data not found' });
    }
    res.json(data);
  } catch (error) {
    logger.error('Error fetching satellite data:', error);
    res.status(500).json({ error: 'Failed to fetch satellite data' });
  }
});

// Create new satellite data (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'analyst') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { dataType, region, latitude, longitude, value, unit, source, acquisitionDate } = req.body;

    const data = await SatelliteData.create({
      dataType,
      region,
      latitude,
      longitude,
      value,
      unit,
      source,
      acquisitionDate
    });

    logger.info(`Satellite data created: ${data.id}`);
    res.status(201).json(data);
  } catch (error) {
    logger.error('Error creating satellite data:', error);
    res.status(500).json({ error: 'Failed to create satellite data' });
  }
});

// Update satellite data (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const data = await SatelliteData.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({ error: 'Satellite data not found' });
    }

    await data.update(req.body);
    logger.info(`Satellite data updated: ${data.id}`);
    res.json(data);
  } catch (error) {
    logger.error('Error updating satellite data:', error);
    res.status(500).json({ error: 'Failed to update satellite data' });
  }
});

module.exports = router;
