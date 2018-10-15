import Review from '../models/review.model';
import Employee from '../models/employee.model';

exports.get_reviews = function (req, res) {
    Review.find(function (err, reviews) {
        if (err)
            console.log(err);
        else
            res.json(reviews);
    });
};

exports.add_review = function (req, res) {
    let rev = new Review(req.body);
    rev.save()
        .then(rev => {
            //uloz task id ownerovi do array
            Employee.findOneAndUpdate({ _id: rev.owner }, { $push: { reviews: rev._id } },
                function (error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(success);
                    }
                });
            res.status(200).json({ 'rev': 'Added successfully' });
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
};

exports.update_review = function (req, res) {
    Review.findOneAndUpdate({ '_id': req.params.id }, { $set: req.body }, (err, task) => {
        if (err) return next(err);
        res.send('Review udpated.');
    });
};
