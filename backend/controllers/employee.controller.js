import Employee from '../models/employee.model';

exports.get_employees = function (req, res) {
    Employee.find(function (err, employees) {
        if (err)
            console.log(err);
        else
            res.json(employees);
    });
};

exports.get_employee_by_id = function (req, res) {
    Employee.findById(req.params.id, (err, employee) => {
            if (err)
                console.log(err);            
            res.json(employee);
        });
};

exports.get_employee_by_id_and_populate_tasks = function (req, res) {
    Employee
        .findById(req.params.id)
        .populate('tasks')
        .exec((err, employee) => {
            if (err)
                console.log(err);
            else
                employee.tasks.forEach(e => {
                    console.log('found task with description: ' + e.description);
                    console.log('       bonus points: ' + e.bonus_points);
                });
            res.json(employee);
        });
};

exports.add_employee = function (req, res) {
    let employee = new Employee(req.body);
    employee.save()
        .then(employee => {
            res.status(200).json({ 'employee': 'Added successfully' });
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
};

exports.update_employee = function (req, res) {
    Employee.findOneAndUpdate({ '_id': req.params.id }, { $set: req.body }, (err, employee) => {
        if (err) return next(err);
        res.status(200).json({ 'employee': 'Updated successfully' });
    });
};

exports.delete_employee = function (req, res) {
    Employee.findByIdAndRemove({ _id: req.params.id }, (err, employee) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
}