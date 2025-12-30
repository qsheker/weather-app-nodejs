/**
 * EXTRA CONTROLLER - src/controllers/extraController.js
 * 
 * PURPOSE:
 * - Handle requests for additional API integrations
 * - Extract and validate query parameters
 * - Call extra services and format responses
 * 
 * WHAT SHOULD BE HERE:
 * 
 * FUNCTION 1: getCountry(req, res, next)
 * - Extracts country code from req.query.code
 * - Validates code is provided (throw 400 if missing)
 * - Calls extraService.getCountryInfo(code)
 * - Formats response data with:
 *   * name (common name)
 *   * population
 *   * region
 *   * languages
 *   * currencies
 *   * flags (svg)
 * - Returns JSON: { success: true, data: {...} }
 * - Passes errors to next(error)
 * 
 * FUNCTION 2: getSunriseSunset(req, res, next)
 * - Extracts lat and lon from req.query
 * - Validates both are provided (throw 400 if missing)
 * - Converts to parseFloat
 * - Calls extraService.getSunriseSunset(lat, lon)
 * - Formats response with:
 *   * sunrise (first element from daily.sunrise)
 *   * sunset (first element from daily.sunset)
 *   * timezone
 * - Returns JSON: { success: true, data: {...} }
 * - Passes errors to next(error)
 * 
 * EXPECTED RESPONSES:
 * Country: { "success": true, "data": { "name": "Kazakhstan", "population": 19397000, ... } }
 * Sunrise: { "success": true, "data": { "sunrise": "2024-12-25T07:45:00", "sunset": "...", "timezone": "..." } }
 */

/**
 * EXTRA CONTROLLER - src/controllers/extraController.js
 * 
 * PURPOSE:
 * - Handle requests for additional API integrations
 * - Extract and validate query parameters
 * - Call extra services and format responses
 * 
 * WHAT SHOULD BE HERE:
 * 
 * FUNCTION 1: getCountry(req, res, next)
 * - Extracts country code from req.query.code
 * - Validates code is provided (throw 400 if missing)
 * - Calls extraService.getCountryInfo(code)
 * - Formats response data with:
 *   * name (common name)
 *   * population
 *   * region
 *   * languages
 *   * currencies
 *   * flags (svg)
 * - Returns JSON: { success: true, data: {...} }
 * - Passes errors to next(error)
 * 
 * FUNCTION 2: getSunriseSunset(req, res, next)
 * - Extracts lat and lon from req.query
 * - Validates both are provided (throw 400 if missing)
 * - Converts to parseFloat
 * - Calls extraService.getSunriseSunset(lat, lon)
 * - Formats response with:
 *   * sunrise (first element from daily.sunrise)
 *   * sunset (first element from daily.sunset)
 *   * timezone
 * - Returns JSON: { success: true, data: {...} }
 * - Passes errors to next(error)
 * 
 * EXPECTED RESPONSES:
 * Country: { "success": true, "data": { "name": "Kazakhstan", "population": 19397000, ... } }
 * Sunrise: { "success": true, "data": { "sunrise": "2024-12-25T07:45:00", "sunset": "...", "timezone": "..." } }
 */

// TODO: Require extraService

// TODO: Create getCountry(req, res, next) async function
// TODO: Extract code from query
// TODO: Validate code parameter
// TODO: Call extraService
// TODO: Format country response
// TODO: Send JSON response
// TODO: Handle errors

// TODO: Create getSunriseSunset(req, res, next) async function
// TODO: Extract lat and lon from query
// TODO: Validate both parameters
// TODO: Parse to float
// TODO: Call extraService
// TODO: Format sunrise/sunset response
// TODO: Send JSON response
// TODO: Handle errors

// TODO: Export both functions in module.exports
