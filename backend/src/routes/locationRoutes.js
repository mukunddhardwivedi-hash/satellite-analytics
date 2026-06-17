const express = require('express');
const { SavedLocation } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const logger = require('../utils/logger');

const router = express.Router();

// Get user's saved locations
router.get('/', authMiddleware, async (req, res) => {
  try {
    const locations = await SavedLocation.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(locations);
  } catch (error) {
    logger.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

// Get public locations
router.get('/public/list', async (req, res) => {
  try {
    const locations = await SavedLocation.findAll({
      where: { isPublic: true },
      order: [['viewCount', 'DESC']],
      limit: 50
    });
    res.json(locations);
  } catch (error) {
    logger.error('Error fetching public locations:', error);
    res.status(500).json({ error: 'Failed to fetch public locations' });
  }
});

// Get location by ID
router.get('/:id', async (req, res) => {
  try {
    const location = await SavedLocation.findByPk(req.params.id);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    if (!location.isPublic) {
      return res.status(403).json({ error: 'Location is private' });
    }

    await location.increment('viewCount');
    res.json(location);
  } catch (error) {
    logger.error('Error fetching location:', error);
    res.status(500).json({ error: 'Failed to fetch location' });
  }
});

// Create new location
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, latitude, longitude, tags } = req.body;

    const location = await SavedLocation.create({
      userId: req.user.id,
      name,
      description,
      latitude,
      longitude,
      tags: tags || []
    });

    logger.info(`Location saved: ${location.id}`);
    res.status(201).json(location);
  } catch (error) {
    logger.error('Error creating location:', error);
    res.status(500).json({ error: 'Failed to create location' });
  }
});

// Update location
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const location = await SavedLocation.findByPk(req.params.id);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    if (location.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await location.update(req.body);
    logger.info(`Location updated: ${location.id}`);
    res.json(location);
  } catch (error) {
    logger.error('Error updating location:', error);
    res.status(500).json({ error: 'Failed to update location' });
  }
});

// Delete location
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const location = await SavedLocation.findByPk(req.params.id);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    if (location.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await location.destroy();
    logger.info(`Location deleted: ${req.params.id}`);
    res.json({ message: 'Location deleted successfully' });
  } catch (error) {
    logger.error('Error deleting location:', error);
    res.status(500).json({ error: 'Failed to delete location' });
  }
});

module.exports = router;
