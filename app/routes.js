'use strict';
const express = require('express');
const router = express.Router();

const { getByIsolation } = require('./countries-by-isolation');
const { findClosest } = require('./find-closest');

/**
   * @swagger
   * /health-check:
   *   get:
   *     description: Returns the homepage
   *     responses:
   *       200:
   *         description: i'm alive...
   */
router.get('/health-check', (req, res) => { res.status(200).send('i\'m alive...').end() })

router.get('/countries-by-isolation', getByIsolation)
router.post('/find-closest', findClosest)

module.exports = router
