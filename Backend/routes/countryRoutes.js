// server/routes/countryRoutes.js
const express = require('express');
const router = express.Router();
const { getCountryByCurrency } = require('../controllers/countryController');
const auth = require('../middleware/auth');


router.get('/:currencyCode', auth, getCountryByCurrency);

module.exports = router;
