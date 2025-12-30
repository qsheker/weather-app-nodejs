/**
 * WEATHER ROUTES - src/routes/weatherRoutes.js
 * 
 * PURPOSE:
 * - Define all weather-related API endpoints
 * - Map HTTP requests to controller functions
 * - Handle routing logic for weather endpoints
 * 
 * WHAT SHOULD BE HERE:
 * - Require express and create router
 * - Require weatherController
 * - Define GET / route
 *   - Calls weatherController.getWeather
 *   - Endpoint: GET /api/weather?city=CityName
 * - Export router
 * 
 * ENDPOINTS:
 * GET /api/weather?city=Astana
 * - Query parameter: city (required)
 * - Returns weather data for the city
 */

const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get("/:city", weatherController.getWeather);

module.exports = router;
