'use strict';
const dao = require('./../data-access/countries');
const { getDistances } = require('../data-access/distance-api');
const _ = require('lodash');

const findClosest = (target, destinations) => {
    const fullAddresses = destinations.map(destination => destination.address + ', ' + destination.country);
    return getDistances(target, fullAddresses)
        .then(results => {
            const maxDistance = _(results).maxBy(result => result.distanceFromOrigin);
            const minDistance = _(results).minBy(result => result.distanceFromOrigin);
            return { maxDistance, minDistance };
        });
}

module.exports = { findClosest };