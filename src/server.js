const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const requestLogger = require('./middleware/requestLogger');
app.use(requestLogger);

const weatherRoutes = require('./routes/weatherRoutes');
const extraRoutes = require('./routes/extraRoutes');

app.use('/api/extra', extraRoutes);
app.use('/api/weather', weatherRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

const errorHandler = require('./middleware/errorHandler');

app.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
