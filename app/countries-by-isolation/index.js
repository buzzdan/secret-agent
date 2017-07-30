'use strict';
const express = require('express')
const router = express.Router();
const dao = require('./../data-access/countries');
const {
    getMaxIsolationLevel,
    getIsolatedCountries,
    updateAgentsInCountries,
    updateIsolatedAgents
} = require('./isolation-service');

const getByIsolation = (req, res) => {
    const context = {
        isolatedAgents: undefined,
        agentsInCountries: undefined
    }
    dao.getCountries()
        .then(updateIsolatedAgents(context))
        .then(updateAgentsInCountries(context))
        .then(getIsolatedCountries(context))
        .then(getMaxIsolationLevel)
        .then(result => res.send(result));
}

module.exports = { getByIsolation };