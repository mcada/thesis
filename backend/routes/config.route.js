const express = require('express');
const router = express.Router();
const config_controller = require('../controllers/config.controller');

router.get('/', config_controller.get_configs);
router.post('/add', config_controller.add_config);
router.delete('/:id/delete', config_controller.delete_config);

module.exports = router;