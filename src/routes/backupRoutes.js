const express = require('express');
const router = express.Router();
const backupController = require('../controllers/backupController');

router.post('/backup', backupController.startBackup);

module.exports = router;
