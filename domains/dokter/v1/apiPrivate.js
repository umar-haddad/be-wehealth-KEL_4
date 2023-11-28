const express = require('express');
const multer = require('multer');
const controller = require('./controller');

// SETUP MULTER
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

// SETUP ROUTER
const router = express.Router();

/**
 * Create One Dokter
 * @api private
 */
router.post('/', upload.single('image'), controller.createOne);

/**
 * Update One Dokter
 * @api private
 */
router.patch('/:id', controller.updateOne);

/**
 * Delete One Dokter
 * @api private
 */
router.delete('/:id', controller.deleteOne);

module.exports = router;