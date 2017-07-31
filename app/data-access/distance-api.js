'use strict';

const rp = require('request-promise-native');
const geometry = require('spherical-geometry-js');
const { promisify } = require('util');
var googleMapsClient = require('@google/maps').createClient({
    key: process.env.GEOCODE_API_KEY
});
const getGeocode = promisify(googleMapsClient.geocode);

const createLocation = (address, location, distanceFromOrigin) => ({
    address, location, distanceFromOrigin
});
const getDistances = (origin, destinations) => {
    // const apiKey = process.env.GOOGLE_API_KEY;
    const geoCodeKey = process.env.GEOCODE_API_KEY;

    return getGeocode({ address: origin })
        .then(response => {
            const { lat, lng } = response.json.results[0].geometry.location;
            return new geometry.LatLng(lat, lng);
        })
        .then(originLocation => {
            const promises = destinations.map(d =>
                getGeocode({ address: d })
                    .then(response => {
                        const { lat, lng } = response.json.results[0].geometry.location;
                        const toLocation = new geometry.LatLng(lat, lng);
                        const distanceFromOrigin = geometry.computeDistanceBetween(originLocation, toLocation)
                        return createLocation(d, toLocation, distanceFromOrigin);
                    }));
                
            return Promise.all(promises);
        })
        .catch(err => {
            throw new Error('Failed Fetching distances and calculating them');
        });
}

module.exports = {
    getDistances
}