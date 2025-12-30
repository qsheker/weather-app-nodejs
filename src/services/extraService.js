/**
 * EXTRA SERVICE - src/services/extraService.js
 * 
 * PURPOSE:
 * - Handle integration with additional external APIs
 * - Implement Country Information API
 * - Implement Sunrise/Sunset API
 * - Provide clean, validated data to controllers
 * 
 * WHAT SHOULD BE HERE:
 * 
 * FUNCTION 1: getCountryInfo(code)
 * - Validates country code parameter
 * - Calls REST Countries API: https://restcountries.com/v3.1/alpha/{code}
 * - Returns country data with fields like name, population, region, languages, currencies, flags
 * - Handles 404 (country not found) with status 404
 * - Returns { success: true, data: response.data[0] }
 * 
 * FUNCTION 2: getSunriseSunset(lat, lon)
 * - Validates latitude and longitude parameters
 * - Calls Open-Meteo API: https://api.open-meteo.com/v1/forecast
 * - Params: latitude, longitude, daily=sunrise,sunset, timezone=auto
 * - Returns sunrise/sunset times
 * - Returns { success: true, data: response.data }
 * 
 * ERROR HANDLING:
 * - Missing parameters: throw error with status 400
 * - API not found: throw error with status 404
 * - API failure: throw error with status 500
 */

const axios = require('axios');

// TODO: Create getCountryInfo(code) async function
// TODO: Validate code parameter
// TODO: Call REST Countries API
// TODO: Handle 404 error (country not found)
// TODO: Handle other errors
// TODO: Return success response

// TODO: Create getSunriseSunset(lat, lon) async function
// TODO: Validate lat and lon parameters
// TODO: Call Open-Meteo API
// TODO: Handle errors
// TODO: Return success response

// TODO: Export both functions in module.exports
