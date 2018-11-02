const express = require('express');
const router = express.Router();
const review_controller = require('../controllers/review.controller');

router.get('/:periodid', review_controller.get_reviews);
router.post('/add', review_controller.add_review);
router.put('/:id/update', review_controller.update_review);
router.get('/:id/:periodid', review_controller.get_review_by_owner_id);

module.exports = router;
