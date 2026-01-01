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
