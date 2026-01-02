const axios = require("axios");

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

if (!API_KEY) {
    throw new Error("OPENWEATHER_API_KEY is missing");
}

async function getWeatherByCity(city) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: "metric",
                lang: "en"
            },
            timeout: 5000
        });

        const data = response.data;
        
        return {
            city: data.name,
            countryCode: data.sys.country,
            lat: data.coord.lat,
            lon: data.coord.lon,
            temperature: data.main.temp,
            feelsLike: data.main.feels_like,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            weatherDescription: data.weather[0].description
        };

    } catch (err) {
        if (err.response) {
            if (err.response.status === 404) {
                throw Object.assign(new Error("City not found"), {
                    status: 404
                });
            }
            if (err.response.status === 401) {
                throw Object.assign(new Error("Invalid API key"), {
                    status: 401
                });
            }
            
            throw Object.assign(new Error(`Weather API error: ${err.response.data.message || 'Unknown error'}`), {
                status: err.response.status
            });
        }    
        throw Object.assign(new Error("Failed to connect to weather service"), {
            status: 500
        });
    }
}

module.exports = {
    getWeatherByCity
};