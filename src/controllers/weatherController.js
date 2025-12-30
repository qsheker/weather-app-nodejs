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

        const response = {
            success: true,
            data: {
                city: weatherData.name,
                temperature: weatherData.main.temp,
                feelsLike: weatherData.main.feels_like,
                humidity: weatherData.main.humidity,
                pressure: weatherData.main.pressure,
                weatherDescription: weatherData.weather[0].description,
                weatherIcon: weatherData.weather[0].icon,
                coordinates: {
                    latitude: weatherData.coord.lat,
                    longitude: weatherData.coord.lon
                },
                windSpeed: weatherData.wind.speed,
                countryCode: weatherData.sys.country,
                rainVolume: weatherData.rain?.['1h'] || null
            }
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
};

module.exports = { getWeather };
