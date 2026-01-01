const axios = require('axios')

const getCountryInfo = async (code) => {
    try {
        if (!code || typeof code !== 'string' || code.trim() === '') {
            const error = new Error('Country code is required and must be a non-empty string');
            error.status = 400;
            throw error;
        }

        const countryCode = code.trim().toUpperCase();
        
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        
        if (!response.data || response.data.length === 0) {
            const error = new Error(`Country with code '${countryCode}' not found`);
            error.status = 404;
            throw error;
        }

        const countryData = response.data[0];
        
        const formattedData = {
            name: countryData.name?.common || 'N/A',
            officialName: countryData.name?.official || 'N/A',
            population: countryData.population || 0,
            region: countryData.region || 'N/A',
            subregion: countryData.subregion || 'N/A',
            capital: Array.isArray(countryData.capital) ? countryData.capital[0] : 'N/A',
            languages: countryData.languages ? Object.values(countryData.languages) : [],
            currencies: countryData.currencies ? Object.keys(countryData.currencies).map(code => ({
                code,
                name: countryData.currencies[code].name,
                symbol: countryData.currencies[code].symbol || ''
            })) : [],
            flag: countryData.flags?.png || countryData.flags?.svg || '',
            flagAlt: countryData.flags?.alt || '',
            timezones: countryData.timezones || [],
            borders: countryData.borders || [],
            area: countryData.area || 0,
            cca2: countryData.cca2 || '', 
            cca3: countryData.cca3 || ''  
        };

        return {
            success: true,
            data: formattedData
        };
        
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                const notFoundError = new Error(`Country with code '${code}' not found`);
                notFoundError.status = 404;
                throw notFoundError;
            }
            
            const apiError = new Error(`Countries API error: ${error.response.status} ${error.response.statusText}`);
            apiError.status = error.response.status || 500;
            throw apiError;
        } else if (error.request) {
            const networkError = new Error('No response from Countries API. Please check your connection.');
            networkError.status = 503;
            throw networkError;
        } else if (error.status) {
            throw error;
        } else {
            const unexpectedError = new Error(`Failed to fetch country information: ${error.message}`);
            unexpectedError.status = 500;
            throw unexpectedError;
        }
    }
};

const getSunriseSunset = async (lat, lon) => {
    try {
        const latitude = parseFloat(lat);
        if (isNaN(latitude) || latitude < -90 || latitude > 90) {
            const error = new Error('Valid latitude is required (-90 to 90)');
            error.status = 400;
            throw error;
        }

        const longitude = parseFloat(lon);
        if (isNaN(longitude) || longitude < -180 || longitude > 180) {
            const error = new Error('Valid longitude is required (-180 to 180)');
            error.status = 400;
            throw error;
        }

        const formattedLat = latitude.toFixed(6);
        const formattedLon = longitude.toFixed(6);
        
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude: formattedLat,
                longitude: formattedLon,
                daily: 'sunrise,sunset',
                timezone: 'auto',
                forecast_days: 1
            },
            timeout: 10000 
        });

        if (!response.data || !response.data.daily) {
            const error = new Error('No sunrise/sunset data available for the specified location');
            error.status = 404;
            throw error;
        }

        const { daily, daily_units } = response.data;
        
        const formattedData = {
            coordinates: {
                latitude: parseFloat(formattedLat),
                longitude: parseFloat(formattedLon)
            },
            timezone: response.data.timezone || 'UTC',
            timezone_abbreviation: response.data.timezone_abbreviation || 'UTC',
            elevation: response.data.elevation || 0,
            today: {
                sunrise: daily.sunrise[0] || 'N/A',
                sunset: daily.sunset[0] || 'N/A',
                sunrise_unit: daily_units?.sunrise || '',
                sunset_unit: daily_units?.sunset || ''
            },
            raw: {
                daily,
                daily_units
            }
        };

        try {
            if (formattedData.today.sunrise !== 'N/A') {
                const sunriseDate = new Date(formattedData.today.sunrise);
                formattedData.today.sunrise_formatted = sunriseDate.toLocaleTimeString();
            }
            if (formattedData.today.sunset !== 'N/A') {
                const sunsetDate = new Date(formattedData.today.sunset);
                formattedData.today.sunset_formatted = sunsetDate.toLocaleTimeString();
            }
        } catch (dateError) {
        }

        return {
            success: true,
            data: formattedData
        };
        
    } catch (error) {
        if (error.response) {
            const apiError = new Error(`Open-Meteo API error: ${error.response.status} ${error.response.statusText}`);
            apiError.status = error.response.status || 500;
            throw apiError;
        } else if (error.request) {
            const networkError = new Error('No response from Open-Meteo API. Please check your connection.');
            networkError.status = 503;
            throw networkError;
        } else if (error.code === 'ECONNABORTED') {
            const timeoutError = new Error('Request to Open-Meteo API timed out');
            timeoutError.status = 504;
            throw timeoutError;
        } else if (error.status) {
            throw error;
        } else {
            const unexpectedError = new Error(`Failed to fetch sunrise/sunset data: ${error.message}`);
            unexpectedError.status = 500;
            throw unexpectedError;
        }
    }
};

const validateCountryCode = (code) => {
    if (!code || typeof code !== 'string') return false;
    const trimmedCode = code.trim().toUpperCase();
    return /^[A-Z]{2,3}$/.test(trimmedCode);
};
module.exports = {
    getCountryInfo,
    getSunriseSunset,
    validateCountryCode
};