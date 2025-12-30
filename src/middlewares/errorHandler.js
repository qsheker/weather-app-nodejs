/**
 * ERROR HANDLER MIDDLEWARE - src/middlewares/errorHandler.js
 * 
 * PURPOSE:
 * - Catch all errors from routes and controllers
 * - Send appropriate HTTP status codes and error messages
 * - Handle different error types (400, 404, 500, etc.)
 * - Return consistent error JSON format
 */

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error(`[${new Date().toISOString()}] Error: ${message} (Status: ${statusCode})`);

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        timestamp: new Date().toISOString()
    });
};

module.exports = errorHandler;
