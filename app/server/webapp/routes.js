const express = require('express');
const homeController = require('./controller');
const router = express.Router();

router.get('/', homeController.index)
router.get('/catalog', homeController.catalog);

module.exports = router;