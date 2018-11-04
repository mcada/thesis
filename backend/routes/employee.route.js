const express = require('express');
const router = express.Router();
const employee_controller = require('../controllers/employee.controller');

router.get('/', employee_controller.get_employees);
router.get('/:id', employee_controller.get_employee_by_id);
router.post('/add', employee_controller.add_employee);
router.put('/:id/update', employee_controller.update_employee);
router.delete('/:id/delete', employee_controller.delete_employee);

module.exports = router;
