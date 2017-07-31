'use strict';

const rp = require('request-promise-native');

const getDistances = (origins, destinations) => {
    const apiKey = process.env.GOOGLE_API_KEY;
    // return rp('https://maps.googleapis.com/maps/api/distancematrix/json?origins=75+9th+Ave+New+York,+NY&destinations=Bridgewater+Commons,+Commons+Way,+Bridgewater,+NJ|The+Mall+At+Short+Hills,+Morris+Turnpike,+Short+Hills,+NJ|Monmouth+Mall,+Eatontown,+NJ|Westfield+Garden+State+Plaza,+Garden+State+Plaza+Boulevard,+Paramus,+NJ|Newport+Centre+Mall,+Jersey+City,+NJ&departure_time=1541202457&traffic_model=best_guess&key='+apiKey);
    return rp('https://maps.googleapis.com/maps/api/distancematrix/json', {
        json: true,
        useQuerystring: true,
        qs: {
            origins,
            destinations,
            // departure_time: 1541202457,
            // traffic_model: 'best_guess',
            // mode: 'driving',
            key: apiKey
        }
    })
}

module.exports = {
    getDistances
}