const express = require('express');
const router = express.Router();
const task_controller = require('../controllers/task.controller');

router.get('/', task_controller.get_tasks);
router.post('/add', task_controller.add_task);
router.put('/:id/update', task_controller.update_task);
router.get('/:owner/:from/:to', task_controller.get_employee_task_in_date);


module.exports = router;
