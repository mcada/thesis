import Config from '../models/config.model';

exports.get_configs = function (req, res) {
    Config.find({}).sort({date_from: 'desc'}).exec(function (err, configs) {
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
            res.status(200).json({ 'rev': 'Added successfully' });
        })
        .catch(err => {
            res.status(400).send('Failed to create new config');
        });
};

exports.delete_config = function (req, res) {
    Config.findByIdAndRemove({ _id: req.params.id }, (err, config) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
}
