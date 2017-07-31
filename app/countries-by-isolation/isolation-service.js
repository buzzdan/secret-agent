'use strict';
const _ = require('lodash');

const agentsByCountries = log => _(log)
    .groupBy(record => record.country)
    .mapValues(records => records.map(r => r.agent))
    .value();

const getIsolatedAgents = log => _(log)
    .groupBy(record => record.agent)
    .pickBy((records, agent) => records.length === 1)
    .map((records, agent) => agent)
    .value();

const updateIsolatedAgents = context => log => {
    context.isolatedAgents = getIsolatedAgents(log);
    return log;
}

const updateAgentsInCountries = context => log => {
    context.agentsInCountries = agentsByCountries(log);
    return log;
}

const countIsolatedAgents = isolatedAgents => agents =>
    agents.reduce((totalIsolated, agent) => isolatedAgents.indexOf(agent) > -1 ?
        totalIsolated + 1 :
        totalIsolated
        , 0);

const getIsolatedCountries = context => () => _(context.agentsInCountries)
    .mapValues(countIsolatedAgents(context.isolatedAgents))
    .map((count, country) => ({ country, isolationLevel: count }))
    .value();

const getMaxIsolationLevel = countries => countries
            .reduce((prev, current) => (prev.isolationLevel > current.isolationLevel) ? prev : current);

module.exports = {
    getMaxIsolationLevel,
    getIsolatedCountries,
    updateAgentsInCountries,
    updateIsolatedAgents
}