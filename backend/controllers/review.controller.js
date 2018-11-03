import Review from '../models/review.model';
import Employee from '../models/employee.model';

exports.get_reviews = function (req, res) {
    Review.find({ period: req.params.periodid }).sort({ total_points: 'desc' }).populate('owner').exec(function (err, reviews) {
        if (err)
            console.log(err);
        else
            res.json(reviews);
    });
};

exports.get_review_by_owner_id = function (req, res) {
    Review.find({ period: req.params.periodid, owner: req.params.id }, (err, review) => {
        if (err)
            console.log(err);
        res.json(review);
    });
};

exports.add_review = function (req, res) {
    let rev = new Review(req.body);
    rev.save((err, review) => {
        if (err)
            console.log(err);
        res.json('Review created');
    });
};

exports.update_review = function (req, res) {
    Review.findOneAndUpdate({ '_id': req.params.id }, { $set: req.body }, (err, task) => {
        if (err) return next(err);
        res.send('Review udpated.');
    });
};
