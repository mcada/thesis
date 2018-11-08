import Task from '../models/task.model';
import Review from '../models/review.model';

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

        //TODO: update all reviews?
        const cursor = Review.find({ owner: task.owner }).populate('period').cursor();

        cursor.on('data', rev => {

            var task_date = new Date(task.date)
            var review_from = new Date(rev.period.date_from)
            var review_to = new Date(rev.period.date_to)

            if (review_from <= task_date && task_date < review_to) {
                console.log('review update required')
                rev.total_points_from_tasks = rev.total_points_from_tasks + task.bonus_points
                rev.total_points = rev.points_from_team_lead + rev.total_points_from_tasks
                rev.save((err, rev) => {
                    if (err)
                        console.log(err)
                });
            }
        });

        res.json('Task created');

    });
};

exports.update_task = function (req, res) {
    let points_difference = parseInt(req.params.points) - parseInt(req.body.bonus_points);

    if (points_difference != 'undefined' && points_difference != 0 && req.params.points != 'undefined') {
        req.body.bonus_points = req.params.points;
    }

    Task.findOneAndUpdate({ '_id': req.params.id }, { $set: req.body }, (err, task) => {
        if (!err) {


            //update review total points if bonus points changed
            if (points_difference != 'undefined' && points_difference != 0 && req.params.points != 'undefined') {
                console.log('updating reviews, points difference is: ' + points_difference)
                const cursor = Review.find({ owner: task.owner }).populate('period').cursor();

                cursor.on('data', rev => {

                    var task_date = new Date(req.body.date)
                    var review_from = new Date(rev.period.date_from)
                    var review_to = new Date(rev.period.date_to)

                    if (review_from <= task_date && task_date < review_to) {
                        console.log('review update required')
                        console.log('current total points from tasks: ' + rev.total_points_from_tasks)
                        console.log('current total points: ' + rev.total_points)
                        rev.total_points_from_tasks = rev.total_points_from_tasks + points_difference
                        rev.total_points = rev.points_from_team_lead + rev.total_points_from_tasks
                        console.log('current total points from tasks: ' + rev.total_points_from_tasks)
                        console.log('current total points: ' + rev.total_points)
                        rev.save((err, rev) => {
                            if (err)
                                console.log(err)
                        });
                    }
                });
            }

            res.status(200).json({ 'task_id': req.params.id, 'status': 'Update successful' });





        }
        else {
            res.json(err);
        }
    });
};

exports.delete_task = function (req, res) {
    Task.findByIdAndRemove({ _id: req.params.id }, (err, task) => {
        if (!err) {
            if (task.bonus_points > 0) {
                console.log('updating reviews, points difference is: ' + task.bonus_points)
                const cursor = Review.find({ owner: task.owner }).populate('period').cursor();

                cursor.on('data', rev => {

                    var task_date = new Date(task.date)
                    var review_from = new Date(rev.period.date_from)
                    var review_to = new Date(rev.period.date_to)

                    if (review_from <= task_date && task_date < review_to) {
                        console.log('review update required')
                        console.log('current total points from tasks: ' + rev.total_points_from_tasks)
                        console.log('current total points: ' + rev.total_points)
                        rev.total_points_from_tasks = rev.total_points_from_tasks - task.bonus_points
                        rev.total_points = rev.points_from_team_lead + rev.total_points_from_tasks
                        console.log('current total points from tasks: ' + rev.total_points_from_tasks)
                        console.log('current total points: ' + rev.total_points)
                        rev.save((err, rev) => {
                            if (err)
                                console.log(err)
                        });
                    }
                });
            }
        
            res.json('Removed successfully')
        }
        else
            res.json(err);
    });
}
