const axios = require("axios");

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

if (!API_KEY) {
    throw Object.assign(new Error("OPENWEATHER_API_KEY is missing"), {
        status: 500
    });
}

async function getWeatherByCity(city) {
    if (!city || city.trim() === "") {
        throw Object.assign(new Error("City is required"), {
            status: 400
        });
    }

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: "metric",
                lang: "en"
            }
        });

        return {
            success: true,
            data: {
                city: response.data.name,
                temp: response.data.main.temp,
                description: response.data.weather[0].description
            }
        };

    } catch (err) {
        if (err.response) {
            if (err.response.status === 404) {
                throw Object.assign(new Error("City not found"), {
                    status: 404
                });
            }

            throw Object.assign(new Error("Weather API error"), {
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
