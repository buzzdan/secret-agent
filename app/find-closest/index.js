'use strict';
const dao = require('./../data-access/countries');
const { getDistances } = require('../data-access/distance-api');

const findClosest = (req, res) => {
    const target = req.body["target-location"];
    getDistances(target, ['new york', 'barcelona']).then(result => {
        res.status(200).send(result).end();
    });
}

module.exports = { findClosest };