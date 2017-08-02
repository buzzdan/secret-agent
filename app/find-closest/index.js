'use strict'
const distanceService = require('./distance-service')
const dao = require('./../data-access/countries')

const findClosest = (req, res) => {
  const target = req.body['target-location']
  dao.getCountries()
    .then(destinations => distanceService.findClosest(target, destinations))
    .then(results => {
      res.status(200).send(results).end()
    })
}

module.exports = { findClosest }
