const express = require('express');
const multer = require('multer');
const controller = require('./controller');

// SETUP ROUTER
const router = express.Router();

/**
 * Get List Dokter
 * @api public
 */
router.get('/', controller.index);

/**
 * Get Detail Dokter
 * @api public
 */
router.get('/:id', controller.detail);

module.exports = router;
