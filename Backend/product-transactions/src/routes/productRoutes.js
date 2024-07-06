const express = require('express');
const router = express.Router();
const initializeController = require('../controllers/initializeController');
const productController = require('../controllers/productController');

router.get('/initialize', initializeController.initializeDatabase);
router.get('/transactions', productController.getTransactions);
router.get('/statistics', productController.getStatistics);
router.get('/bar-chart', productController.getBarChart);
router.get('/pie-chart', productController.getPieChart);
router.get('/combined', productController.getCombinedData);

module.exports = router;
