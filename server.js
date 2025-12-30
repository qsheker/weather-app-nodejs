/**
 * MAIN SERVER FILE - server.js
 * 
 * PURPOSE:
 * - Initialize Express app
 * - Set up all middleware (body parser, static files, custom middlewares)
 * - Import and register all routes
 * - Start the server on port 3000
 * - Configure error handling middleware at the end
 */

const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Import and use requestLogger middleware
const requestLogger = require('./middleware/requestLogger');
app.use(requestLogger);

// ===== ROUTES =====
const weatherRoutes = require('./routes/weatherRoutes');
const extraRoutes = require('./routes/extraRoutes');

app.use('/weather', weatherRoutes);
app.use('/extra', extraRoutes);

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ===== ERROR HANDLING =====
const errorHandler = require('./middleware/errorHandler');

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handler middleware (must be last)
app.use(errorHandler);

// ===== START SERVER =====
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
