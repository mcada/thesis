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
    Review.findOne({ period: req.params.periodid, owner: req.params.id }).populate('owner').exec((err, review) => {
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
    Review.findOneAndUpdate({ '_id': req.params.id }, { $set: req.body }, (err, rev) => {
        if (err) 
            console.log(err);
        res.json('Review udpated.');
    });
};
