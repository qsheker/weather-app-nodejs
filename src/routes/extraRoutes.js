/**
 * EXTRA ROUTES - src/routes/extraRoutes.js
 * 
 * PURPOSE:
 * - Define all additional API endpoints
 * - Map HTTP requests to extra controller functions
 * 
 * WHAT SHOULD BE HERE:
 * - Require express and create router
 * - Require extraController
 * - Define GET /country route
 *   - Calls extraController.getCountry
 *   - Endpoint: GET /api/extra/country?code=KZ
 * - Define GET /sunrise-sunset route
 *   - Calls extraController.getSunriseSunset
 *   - Endpoint: GET /api/extra/sunrise-sunset?lat=51.1694&lon=71.4491
 * - Export router
 * 
 * ENDPOINTS:
 * GET /api/extra/country?code=KZ
 * - Query parameter: code (country code, required)
 * - Returns country information
 * 
 * GET /api/extra/sunrise-sunset?lat=51.1694&lon=71.4491
 * - Query parameters: lat (latitude), lon (longitude) - both required
 * - Returns sunrise/sunset times
 */

const express = require('express');
const router = express.Router();

// TODO: Require extraController

// TODO: Define GET /country route with extraController.getCountry

// TODO: Define GET /sunrise-sunset route with extraController.getSunriseSunset

// TODO: Export router
