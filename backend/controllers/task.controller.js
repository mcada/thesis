import Task from '../models/task.model';
import Employee from '../models/employee.model';

var ObjectID = require('mongodb').ObjectID;

exports.get_tasks = function (req, res) {
    Task.find(function (err, tasks) {
        if (err)
            console.log(err);
        else
            res.json(tasks);
    });
};

exports.get_employee_task_in_date = function (req, res) {
    Task.find({ date: { "$gte": new Date(req.params.from), "$lt": new Date(req.params.to) }, owner: new ObjectID(req.params.owner) }, (err, tasks) => {
        if (err)
            console.log(err);
        else
            res.json(tasks);
    });
};

exports.add_task = function (req, res) {
    let task = new Task(req.body);

    task.save((err, task) => {
        if (err)
            console.log(err);
        res.json('Task created');
    });
};

exports.update_task = function (req, res) {
    Task.findOneAndUpdate({ '_id': req.params.id }, { $set: req.body }, (err, task) => {
        if (err) return next(err);
        res.status(200).json({ 'task_id': req.params.id, 'status': 'Update successful' });
    });
};

exports.delete_task = function (req, res) {
    Task.findByIdAndRemove({ _id: req.params.id }, (err, task) => {
        if (!err)
            res.json('Removed successfully')
        else
            res.json(err);
    });
}
