import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Task from './models/Task';
import Review from './models/Review';
import Employee from './models/Employee';

const app = express();
const router = express.Router();
const assert = require('assert');

app.use(cors());
app.use(bodyParser.json());

//bud muzu otvirat databazi tim co je nasledne zakomentovane
/**
mongoose.connect('mongodb://localhost:27017/coolDatabase', { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});
**/

//////////////nebo takhle kde si db sama drzi connections v poolu a stara se o ne?
// This is a global variable we'll use for handing the MongoDB client
var mongodb;

// Connection URL
var url = 'mongodb://localhost:27017/coolDatabase';
// Create the database connection
mongoose.connect(url, {  
    poolSize: 3,
    useNewUrlParser: true
    // other options can go here
  },function(err, db) {
      assert.equal(null, err);
      mongodb=db;
      }
  );

/////////////////////////////////////////////////////////////////////


router.route('/tasks').get((req, res) => {
    Task.find((err, tasks) => {
        if (err)
            console.log(err);
        else
            res.json(tasks);
    });
});

router.route('/tasks/add').post((req, res) => {
    let task = new Task(req.body);

    task.save()
        .then(task => {
            //uloz task id ownerovi do array
            Employee.findOneAndUpdate({ _id: task.owner }, {$push: {tasks: task._id}},
                function (error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(success);
                    }
                });                
            res.status(200).json({'task': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/tasks/update/:id').post((req, res) => {
    Task.findById(req.params.id, (err, task) => {
        if (!task)
            return next(new Error('Could not load Document'));
        else {
            //TODO: only change if the value is present!
            task.description = req.body.description;
            task.bonus_points = req.body.bonus_points;

            task.save().then(task => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/reviews').get((req, res) => {
    Review.find((err, reviews) => {
        if (err)
            console.log(err);
        else
            res.json(reviews);
    });
});

router.route('/reviews/add').post((req, res) => {
    let rev = new Review(req.body);
    rev.save()
        .then(rev => {
            res.status(200).json({'rev': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/employees').get((req, res) => {
    Employee.find((err, employees) => {
        if (err)
            console.log(err);
        else
            res.json(employees);
    });
});

router.route('/employees/:id').get((req, res) => {
    Employee
    .findById(req.params.id)
    .populate('tasks')
    .exec((err, employee) => {
        if (err)
            console.log(err);
        else
            employee.tasks.forEach(e => {
                console.log('found task with description: ' + e.description);
                console.log('       bonus points: ' + e.bonus_points);
            });
            res.json(employee);
    });
});

router.route('/employees/add').post((req, res) => {
    let employee = new Employee(req.body);
    employee.save()
        .then(employee => {
            res.status(200).json({'employee': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/employees/update/:id').post((req, res) => {
    Employee.findById(req.params.id, (err, employee) => {
        if (!employee)
            return next(new Error('Could not load Document'));
        else {
            //TODO: only change if the value is present!
            employee.first_name = req.body.first_name;
            employee.last_name = req.body.last_name;
            employee.rhnick = req.body.rhnick;
            employee.manager = req.body.manager;
            employee.position = req.body.position;
            employee.team_lead = req.body.team_lead;

            employee.save().then(employee => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/employees/delete/:id').delete((req, res) => {
    Employee.findByIdAndRemove({_id: req.params.id}, (err, employee) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));

process.on('SIGINT', function(){
    mongodb.close(function(){
      console.log("Mongoose connection is disconnected due to application termination");
       process.exit(0);
      });
});