import Config from '../models/config.model';
import Employee from '../models/employee.model';
import Review from '../models/review.model';
import Task from '../models/task.model';
import Setting from '../models/setting.model';

var ObjectID = require('mongodb').ObjectID;
var request = require('request');
var dateFormat = require('dateformat');

exports.get_configs = function (req, res) {
    Config.find({}).sort({ date_from: 'desc' }).exec(function (err, configs) {
        if (err)
            console.log(err);
        else
            res.json(configs);
    });
};

exports.get_settings = function (req, res) {
    Setting.findOne(function (err, settings) {
        if (err)
            console.log(err);
        else
            // res.json('{"updated":"' + dateFormat(settings.updated, "yyyy-mm-dd") + '"}');
            res.json(dateFormat(settings.updated, "yyyy-mm-dd"));

    });
};

exports.add_config = function (req, res) {
    let newConfig = new Config(req.body);
    newConfig.save()
        .then(newConfig => {
            // create empty reviews for every user
            const stream = Employee.find().cursor();
            // Print every document that matches the query, one at a time
            stream.on('data', emp => {
                console.log(emp._id);

                Task.aggregate([{
                    $match: { owner: new ObjectID(emp._id), date: { "$gte": new Date(newConfig.date_from), "$lt": new Date(newConfig.date_to) } },
                }, {
                    $group: {
                        _id: "a",
                        total: {
                            $sum: "$bonus_points"
                        }
                    }
                }], (err, result) => {
                    if (err)
                        console.log(err)

                    let newReview = new Review();

                    if (result[0] != undefined) {
                        newReview.total_points_from_tasks = result[0].total
                        newReview.total_points = result[0].total
                    }
                    console.log('total counted points: ' + newReview.total_points)

                    newReview.owner = emp._id
                    newReview.period = newConfig._id
                    newReview.save()

                });

            });

            res.status(200).json({ 'rev': 'Added successfully' });
        })
        .catch(err => {
            res.status(400).send('Failed to create new config');
        });
};

exports.delete_config = function (req, res) {
    Config.findByIdAndRemove({ _id: req.params.id }, (err, config) => {
        if (!err) {
            Review.remove({ period: req.params.id }, (err, item) => {
                if (err)
                    console.log(err)
                else
                    console.log('reviews deleted')
            });
            res.json('Removed successfully');
        }
        else
            res.json(err);
    });
}

exports.update_tasks_from_jira = function (req, res) {

    Setting.findOne((err, settings) => {
        if (err) console.log(err);
        var dateFrom = dateFormat(settings.updated, "yyyy-mm-dd");
        var dateTo = dateFormat(new Date(), "yyyy-mm-dd");

        const cursor = Employee.find().cursor();

        cursor.on('data', employee => {

            var bodyData = {
                "jql": "project = FUSEQE & assignee = '" + employee.rhnick + "' & status = closed & resolutiondate >= " + dateFrom + ' & resolutiondate <= ' + dateTo,
                "startAt": 0,
                "maxResults": 1000,
                "fields":
                    [
                        "key",
                        "summary",
                        "resolutiondate",
                    ]
            };

            var options = {
                method: 'POST',
                url: 'https://issues.jboss.org/rest/api/2/search',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + settings.token,
                },
                body: bodyData,
                json: true
            };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                console.log(
                    'Response from jira: ' + response.statusCode + ' ' + response.statusMessage
                );
                console.log('Found this many issues for ' + employee.rhnick + ': ' + body.issues.length);

                // console.log(body)
                body.issues.forEach((issue) => {

                    let task = new Task();
                    task.description = issue.fields.summary
                    task.jira_link = "https://issues.jboss.org/browse/" + issue.key
                    task.date = issue.fields.resolutiondate
                    task.owner = employee._id

                    task.save((err, result) => {
                        if (err) console.log(err)
                    });
                });
            });
        })

        settings.updated = new Date()
        console.log('Updating settings to date ' + settings.updated)
        Setting.findOneAndUpdate({ _id: settings._id }, { $set: settings }, (err, result) => {
            if (err) console.log(err)

            res.json('Success')
        })
    })
};


exports.sync_reviews = function (req, res) {
    const cursor = Review.find({ period: req.params.periodid }).populate('period').cursor();

    cursor.on('data', rev => {
        console.log('updating review')

        Task.aggregate([{
            $match: { owner: new ObjectID(rev.owner), date: { "$gte": new Date(rev.period.date_from), "$lt": new Date(rev.period.date_to) } },
        }, {
            $group: {
                _id: "a",
                total: {
                    $sum: "$bonus_points"
                }
            }
        }], (err, result) => {
            if (err)
                console.log(err)

            if (result[0] != undefined) {
                rev.total_points_from_tasks = result[0].total
                rev.total_points = rev.points_from_team_lead + rev.points_from_manager + result[0].total
            }
            console.log('total counted points for ' + rev.owner + ': ' + rev.total_points)

            Review.findOneAndUpdate({ _id: rev._id }, { $set: rev }, (err, result) => {
                if (err) console.log(err)
            })
        });
    });

    //TODO: here I should wait for cursor to finish before sending a response :/
    // maybe cursor.on is not ok here, manual iteration over cursor.next would help?
    res.json("Progressing...")
};
