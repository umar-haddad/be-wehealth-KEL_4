const express = require('express');
const multer = require('multer');
const controller = require('./controller');

// SETUP MULTER
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

// SETUP ROUTER
const router = express.Router();

/**
 * Create One Article
 * @api private
 */
router.post('/', upload.single('image'), controller.createOne);

/**
 * Update One Article
 * @api private
 */
router.patch('/:id', upload.single('image'), controller.updateOne);

/**
 * Delete One Article
 * @api private
 */
router.delete('/:id', controller.deleteOne);

module.exports = router;
