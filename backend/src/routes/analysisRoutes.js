const express = require('express');
const { Analysis } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const logger = require('../utils/logger');
const { Op } = require('sequelize');

const router = express.Router();

// Get user's analyses
router.get('/', authMiddleware, async (req, res) => {
  try {
    const analyses = await Analysis.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(analyses);
  } catch (error) {
    logger.error('Error fetching analyses:', error);
    res.status(500).json({ error: 'Failed to fetch analyses' });
  }
});

// Get analysis by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const analysis = await Analysis.findByPk(req.params.id);
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    if (analysis.userId !== req.user.id && !analysis.isPublic) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(analysis);
  } catch (error) {
    logger.error('Error fetching analysis:', error);
    res.status(500).json({ error: 'Failed to fetch analysis' });
  }
});

// Create new analysis
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, analysisType, region, startDate, endDate, parameters } = req.body;

    const analysis = await Analysis.create({
      userId: req.user.id,
      title,
      description,
      analysisType,
      region,
      startDate,
      endDate,
      parameters
    });

    logger.info(`Analysis created: ${analysis.id}`);
    res.status(201).json(analysis);
  } catch (error) {
    logger.error('Error creating analysis:', error);
    res.status(500).json({ error: 'Failed to create analysis' });
  }
});

// Update analysis
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const analysis = await Analysis.findByPk(req.params.id);
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    if (analysis.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await analysis.update(req.body);
    logger.info(`Analysis updated: ${analysis.id}`);
    res.json(analysis);
  } catch (error) {
    logger.error('Error updating analysis:', error);
    res.status(500).json({ error: 'Failed to update analysis' });
  }
});

// Delete analysis
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const analysis = await Analysis.findByPk(req.params.id);
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    if (analysis.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await analysis.destroy();
    logger.info(`Analysis deleted: ${req.params.id}`);
    res.json({ message: 'Analysis deleted successfully' });
  } catch (error) {
    logger.error('Error deleting analysis:', error);
    res.status(500).json({ error: 'Failed to delete analysis' });
  }
});

module.exports = router;
