const express = require('express');
const { NaturalEvent } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const logger = require('../utils/logger');
const { Op } = require('sequelize');

const router = express.Router();

// Get all natural events
router.get('/', async (req, res) => {
  try {
    const { eventType, isActive, startDate, endDate } = req.query;
    const where = {};

    if (eventType) where.eventType = eventType;
    if (isActive !== undefined) where.isActive = isActive === 'true';
    if (startDate || endDate) {
      where.startDate = {};
      if (startDate) where.startDate[Op.gte] = new Date(startDate);
      if (endDate) where.startDate[Op.lte] = new Date(endDate);
    }

    const events = await NaturalEvent.findAll({
      where,
      limit: parseInt(req.query.limit) || 100,
      offset: parseInt(req.query.offset) || 0,
      order: [['startDate', 'DESC']]
    });

    res.json(events);
  } catch (error) {
    logger.error('Error fetching natural events:', error);
    res.status(500).json({ error: 'Failed to fetch natural events' });
  }
});

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await NaturalEvent.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    logger.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// Create new event (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'analyst') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { eventType, title, description, latitude, longitude, startDate, severity } = req.body;

    const event = await NaturalEvent.create({
      eventType,
      title,
      description,
      latitude,
      longitude,
      startDate,
      severity
    });

    logger.info(`Event created: ${event.id}`);
    res.status(201).json(event);
  } catch (error) {
    logger.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Update event (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const event = await NaturalEvent.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    await event.update(req.body);
    logger.info(`Event updated: ${event.id}`);
    res.json(event);
  } catch (error) {
    logger.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

module.exports = router;
