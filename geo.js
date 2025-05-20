const fs = require('fs');
const turf = require('@turf/turf');
const rawData = fs.readFileSync('./data/setores_censitarios.json', 'utf8');
const geoJSON = JSON.parse(rawData);

function getGeoJsonNearbyTracts(lat, lon, radius) {
    const searchPoint = turf.point([parseFloat(lon), parseFloat(lat)]);
    const bufferRadius = radius ? parseFloat(radius) : 1; // Setta default como 1km de raio
    const buffer = turf.buffer(searchPoint, bufferRadius, { units: 'kilometers' });
    const matches = [];

    for (const feature of geoJSON.features) {
        if (!feature.geometry || feature.geometry.type !== 'Polygon') continue;

        const polygon = turf.polygon(feature.geometry.coordinates);

        if (turf.booleanIntersects(buffer, polygon)) {
            matches.push({
                tract: feature.properties.CD_SETOR,
                neighborhood: feature.properties.NM_BAIRRO,
                city: feature.properties.NM_MUN,
                geometry: feature.geometry
            });
        }
    }

    return {
        center: searchPoint.geometry.coordinates,
        radius: bufferRadius,
        matchedCount: matches.length,
        tracts: matches
    };
}

module.exports = { getGeoJsonNearbyTracts };