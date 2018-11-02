import Employee from '../models/employee.model';
import Config from '../models/config.model';
import Review from '../models/review.model';

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
    //TODO: PRO KAZDOU CONFIG PERIOD VYROB REVIEW A PRIRAD HO K DANEMU EMPLOYEE
    employee.save()
        .then(employee => {
            // create empty reviews for every user
            const stream = Config.find().stream();
            // Print every document that matches the query, one at a time
            stream.on('data', con => {
                console.log(con._id);

                let newReview = new Review();
                newReview.owner = employee._id
                newReview.period = con._id
                newReview.total_points = 0
                newReview.points_from_team_lead = 0
                newReview.total_points_from_tasks = 0
                newReview.feedback_manager = ''
                newReview.feedback_team_lead= ''
                newReview.save()
            });
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