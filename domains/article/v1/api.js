const express = require('express');
const multer = require('multer');
const controller = require('./controller');

// SETUP MULTER
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

// SETUP ROUTER
const router = express.Router();

/**
 * Get List Article
 * @api public
 */
router.get('/', controller.index);

/**
 * Get Detail Article
 * @api public
 */
router.get('/:id', controller.detail);

/**
 * Update One Article
 * @api private
 */
router.put('/:id', controller.updateOne);

/**
 * Delete One Article
 * @api private
 */
router.delete('/:id', controller.deleteOne);

module.exports = router;
