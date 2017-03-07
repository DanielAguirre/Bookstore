const express = require('express');
const homeController = require('./controller');

const router = express.Router();

router.get('/', homeController.index);
router.get('/add', homeController.add);
router.get('/edit/:id', homeController.edit);

module.exports = router;
