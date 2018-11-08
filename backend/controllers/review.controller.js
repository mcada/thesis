import Review from '../models/review.model';
import Employee from '../models/employee.model';
import Config from '../models/config.model'

exports.get_reviews = function (req, res) {
    Review.find({ period: req.params.periodid }).sort({ total_points: 'desc' }).populate('owner').exec(function (err, reviews) {
        if (err)
            console.log(err);
        else
            res.json(reviews);
    });
};

exports.get_review_by_owner_id = function (req, res) {
    Review.findOne({ period: req.params.periodid, owner: req.params.id }).populate('owner').exec((err, review) => {
        if (err)
            console.log(err);
        res.json(review);
    });
};

exports.add_review = function (req, res) {
    let rev = new Review(req.body);

    //TODO: bro you are creating new review - update tasks!
    Config.findById(rev.period, (err, period) => {
        if (err)
            console.log(err);
        console.log('found config, updating total bonus points')
        const cursor = Task.find({ owner: new ObjectID(rev.owner), date: { "$gte": new Date(period.date_from), "$lt": new Date(period.date_to) } }).cursor();

        cursor.on('data', task => {
            console.log('updating total points: +' + task.bonus_points)
            rev.total_points_from_tasks = rev.total_points_from_tasks + task.bonus_points
            rev.total_points = rev.total_points_from_tasks + rev.points_from_team_lead
        })

        rev.save((err, review) => {
            if (err)
                console.log(err);
            res.json('Review created');
        });
    })
};

exports.update_review = function (req, res) {
    Review.findOneAndUpdate({ '_id': req.params.id }, { $set: req.body }, (err, rev) => {
        if (err)
            console.log(err);
        res.json('Review udpated.');
    });
};
