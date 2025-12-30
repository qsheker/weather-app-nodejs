/**
 * FRONTEND APP - public/js/app.js
 * 
 * PURPOSE:
 * - Handle all client-side logic
 * - Send requests to backend API
 * - Display weather data, country info, and sunrise/sunset times
 * - Handle user interactions and error messages
 * 
 * WHAT SHOULD BE HERE:
 * 
 * DOM ELEMENTS:
 * - Get references to: cityInput, searchBtn, weatherSection, errorSection, errorMessage
 * 
 * EVENT LISTENERS:
 * - searchBtn click event -> handleSearch()
 * - cityInput keypress (Enter key) -> handleSearch()
 * 
 * MAIN FUNCTIONS:
 * 
 * 1. handleSearch()
 *    - Get city from input
 *    - Validate city is not empty
 *    - Fetch weather data from /api/weather?city=...
 *    - Call displayWeather()
 *    - Fetch country info from /api/extra/country?code=...
 *    - Fetch sunrise/sunset from /api/extra/sunrise-sunset?lat=...&lon=...
 *    - Handle errors with showError()
 * 
 * 2. displayWeather(data)
 *    - Update DOM elements with weather data:
 *      * city name
 *      * temperature
 *      * feels like
 *      * humidity
 *      * pressure
 *      * weather description
 *      * wind speed
 *      * rain volume
 *    - Set weather icon from OpenWeather
 *    - Display coordinates
 *    - Display map using OpenStreetMap iframe
 * 
 * 3. fetchCountryInfo(countryCode)
 *    - Async fetch from /api/extra/country?code=...
 *    - Call displayCountry()
 *    - Show country section
 * 
 * 4. displayCountry(data)
 *    - Update country information:
 *      * name
 *      * population
 *      * region
 *      * languages
 *      * currencies
 *      * flag image
 * 
 * 5. fetchSunriseSunset(lat, lon)
 *    - Async fetch from /api/extra/sunrise-sunset?lat=...&lon=...
 *    - Call displaySunriseSunset()
 *    - Show sunrise/sunset section
 * 
 * 6. displaySunriseSunset(data)
 *    - Format and display:
 *      * sunrise time
 *      * sunset time
 * 
 * 7. showError(message)
 *    - Display error message in error section
 *    - Hide weather section
 */

// TODO: Get DOM element references

// TODO: Add event listeners to searchBtn and cityInput

// TODO: Create handleSearch() function
// TODO: Validate city input
// TODO: Fetch weather data
// TODO: Display weather
// TODO: Fetch country info
// TODO: Fetch sunrise/sunset
// TODO: Handle errors

// TODO: Create displayWeather(data) function
// TODO: Update all weather data in DOM
// TODO: Set weather icon image
// TODO: Display coordinates
// TODO: Set map iframe src

// TODO: Create fetchCountryInfo(countryCode) function
// TODO: Make fetch request
// TODO: Handle response
// TODO: Call displayCountry()

// TODO: Create displayCountry(data) function
// TODO: Update country information in DOM

// TODO: Create fetchSunriseSunset(lat, lon) function
// TODO: Make fetch request
// TODO: Call displaySunriseSunset()

// TODO: Create displaySunriseSunset(data) function
// TODO: Update sunrise/sunset times in DOM

// TODO: Create showError(message) function
// TODO: Display error message
// TODO: Hide weather section
