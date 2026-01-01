const extraService = require('../services/extraService');

const getCountry = async (req, res, next) => {
    try {
        const { code } = req.query;
        
        if (!code || typeof code !== 'string' || code.trim() === '') {
            const error = new Error('Country code is required');
            error.status = 400;
            error.details = 'Please provide a valid country code (e.g., US, GB, KZ)';
            throw error;
        }
        
        const serviceResult = await extraService.getCountryInfo(code);
        
        const formattedData = {
            name: serviceResult.data.name || 'N/A',
            officialName: serviceResult.data.officialName || 'N/A',
            population: serviceResult.data.population || 0,
            region: serviceResult.data.region || 'N/A',
            subregion: serviceResult.data.subregion || 'N/A',
            capital: serviceResult.data.capital || 'N/A',
            languages: serviceResult.data.languages || [],
            currencies: serviceResult.data.currencies || [],
            flag: serviceResult.data.flag || '',
            flagAlt: serviceResult.data.flagAlt || '',
            timezones: serviceResult.data.timezones || [],
            borders: serviceResult.data.borders || [],
            area: serviceResult.data.area || 0,
            cca2: serviceResult.data.cca2 || '',
            cca3: serviceResult.data.cca3 || ''
        };
        
        res.status(200).json({
            success: true,
            data: formattedData,
            message: `Country information retrieved successfully for ${formattedData.name}`
        });
        
    } catch (error) {
        next(error);
    }
};

const getSunriseSunset = async (req, res, next) => {
    try {
        const { lat, lon } = req.query;
        
        if (!lat || !lon) {
            const error = new Error('Both latitude and longitude are required');
            error.status = 400;
            error.details = 'Please provide both lat and lon query parameters (e.g., lat=40.7128&lon=-74.0060)';
            throw error;
        }
        
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);
        
        if (isNaN(latitude) || isNaN(longitude)) {
            const error = new Error('Latitude and longitude must be valid numbers');
            error.status = 400;
            throw error;
        }
        
        if (latitude < -90 || latitude > 90) {
            const error = new Error('Latitude must be between -90 and 90 degrees');
            error.status = 400;
            throw error;
        }
        
        if (longitude < -180 || longitude > 180) {
            const error = new Error('Longitude must be between -180 and 180 degrees');
            error.status = 400;
            throw error;
        }
        
        const serviceResult = await extraService.getSunriseSunset(latitude, longitude);
        
        const formattedData = {
            coordinates: {
                latitude: serviceResult.data.coordinates.latitude,
                longitude: serviceResult.data.coordinates.longitude
            },
            sunrise: serviceResult.data.today.sunrise || 'N/A',
            sunset: serviceResult.data.today.sunset || 'N/A',
            sunrise_formatted: serviceResult.data.today.sunrise_formatted || 'N/A',
            sunset_formatted: serviceResult.data.today.sunset_formatted || 'N/A',
            timezone: serviceResult.data.timezone || 'UTC',
            timezone_abbreviation: serviceResult.data.timezone_abbreviation || 'UTC',
            elevation: serviceResult.data.elevation || 0
        };
        
        res.status(200).json({
            success: true,
            data: formattedData,
            message: `Sunrise and sunset times retrieved for coordinates (${formattedData.coordinates.latitude}, ${formattedData.coordinates.longitude})`
        });
        
    } catch (error) {
        next(error);
    }
};

const getCompleteCityInfo = async (req, res, next) => {
    try {
        const { city } = req.query;
        
        if (!city || typeof city !== 'string' || city.trim() === '') {
            const error = new Error('City name is required');
            error.status = 400;
            throw error;
        }
        
        const completeInfo = {
            city: city,
            timestamp: new Date().toISOString(),
            note: 'This endpoint would combine weather service with extra services'
        };
        
        res.status(200).json({
            success: true,
            data: completeInfo,
            message: 'Complete city information endpoint (placeholder)'
        });
        
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCountry,
    getSunriseSunset,
    getCompleteCityInfo
};