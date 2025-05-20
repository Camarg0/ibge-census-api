const express = require('express');
const app = express();
const PORT = 3000;
const { getGeoJsonNearbyTracts } = require('./geo');

app.get('/get-census-tract', (request, response) => {
    const { lat, lon, radius } = request.query;

    if (!lat || !lon) {
        return response.status(400).json({ error: 'Missing latitude or longitude' });
    }

    const result = getGeoJsonNearbyTracts(lat, lon, radius);

    response.json(result);
});

app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
