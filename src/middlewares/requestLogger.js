/**
 * REQUEST LOGGER MIDDLEWARE - src/middlewares/requestLogger.js
 * 
 * PURPOSE:
 * - Log all incoming HTTP requests
 * - Display request method, path, and timestamp
 * - Help with debugging and monitoring
 */

const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
};

module.exports = requestLogger;
