const express = require('express');
const router = express.Router();

const extraController = require('../controllers/extraController');

router.get('/country', extraController.getCountry);

router.get('/sunrise-sunset', extraController.getSunriseSunset);

router.get('/complete', extraController.getCompleteCityInfo);

module.exports = router;