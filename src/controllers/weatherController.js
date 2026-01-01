const weatherService = require('../services/weatherService');

const getWeather = async (req, res, next) => {
    try {
        const { city } = req.query;

        if (!city) {
            const error = new Error('City parameter is required');
            error.status = 400;
            throw error;
        }

        const weatherData = await weatherService.getWeatherByCity(city);
        
        res.status(200).json({
            success: true,
            data: weatherData
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getWeather };