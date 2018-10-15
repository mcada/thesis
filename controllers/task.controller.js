import Task from '../models/task.model';
import Employee from '../models/employee.model';

exports.get_tasks = function (req, res) {
    Task.find(function (err, tasks) {
        if (err)
            console.log(err);
        else
            res.json(tasks);
    });
};

exports.add_task = function (req, res) {
    let task = new Task(req.body);

    task.save()
        .then(task => {
            //uloz task id ownerovi do array
            Employee.findOneAndUpdate({ _id: task.owner }, { $push: { tasks: task._id } },
                function (error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(success);
                    }
                });
            res.status(200).json({ 'task': 'Added successfully' });
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
};

exports.update_task = function (req, res) {
    Task.findOneAndUpdate({ '_id': req.params.id }, { $set: req.body }, (err, task) => {
        if (err) return next(err);
        res.send('Task udpated.');
    });
};