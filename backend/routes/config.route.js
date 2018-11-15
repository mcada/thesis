const express = require('express');
const router = express.Router();
const config_controller = require('../controllers/config.controller');

router.get('/', config_controller.get_configs);
router.get('/settings', config_controller.get_settings);
//TODO: for now this endpoint is not used as the app should be synced by default
//      but maybe if we refactor the logic we can use it
router.get('/sync/:periodid', config_controller.sync_reviews);
router.get('/updatefromjira', config_controller.update_tasks_from_jira);
router.post('/add', config_controller.add_config);
router.delete('/:id/delete', config_controller.delete_config);

module.exports = router;