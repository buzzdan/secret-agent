'use strict';
const express = require('express')
const router = express.Router();

const {getByIsolation} = require('./countries-by-isolation');
const closestRoutes = require('./find-closest');

router.get('/', (req, res) =>{res.status(200).send('hi').end()});
router.get('/countries-by-isolation', getByIsolation);
// router.use(closestRoutes);

module.exports = router;