import Employee from '../models/employee.model';
import Config from '../models/config.model';
import Review from '../models/review.model';
import Task from '../models/task.model';
var ObjectID = require('mongodb').ObjectID;

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
        if (err) {
            console.log(err);
            res.status(404)
        }
        res.status(200).json({ 'employee': 'Updated successfully' });
    });
};

exports.delete_employee = function (req, res) {
    var id = req.params.id
    //TODO: some check that id makes sense?
    Employee.findByIdAndRemove({ _id: id }, (err, employee) => {
        if (err)            
            res.json(err);
        else
            Review.remove({ owner: new ObjectID(id) }, (err, rev) => {
                if (err)
                    res.json(err);
            });
            Task.remove({ owner: new ObjectID(id) }, (err, task) => {
                if (err)
                    res.json(err);
            });
            res.json('Removed successfully');
    });
}