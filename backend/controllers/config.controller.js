import Config from '../models/config.model';
import Employee from '../models/employee.model';
import Review from '../models/review.model';

exports.get_configs = function (req, res) {
    Config.find({}).sort({ date_from: 'desc' }).exec(function (err, configs) {
        if (err)
            console.log(err);
        else
            res.json(configs);
    });
};

exports.add_config = function (req, res) {
    let newConfig = new Config(req.body);
    newConfig.save()
        .then(newConfig => {
            // create empty reviews for every user
            const stream = Employee.find().stream();
            // Print every document that matches the query, one at a time
            stream.on('data', emp => {
                console.log(emp._id);

                let newReview = new Review();
                newReview.owner = emp._id
                newReview.period = newConfig._id
                newReview.total_points = 0
                newReview.points_from_team_lead = 0
                newReview.total_points_from_tasks = 0
                newReview.feedback_manager = ''
                newReview.feedback_team_lead = ''
                newReview.save()
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
