import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

//route imports
const employee = require('./routes/employee.route');
const task = require('./routes/task.route');
const review = require('./routes/review.route');
const config = require('./routes/config.route');

//other imports
const app = express();
const router = express.Router();
const assert = require('assert');

//app setup
app.use(cors());
app.use(bodyParser.json());

//route set up
app.use('/employee', employee);
app.use('/task', task);
app.use('/review', review);
app.use('/config', config);
//TODO: zjistit jesi vubec routu / potrebuji, podle me ne
app.use('/', router);

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
const URL =  process.env.DATABASE || 'mongodb://localhost:27017/coolDatabase';
const PORT = process.env.PORT || 4000; 
// Create the database connection
mongoose.connect(URL, {
    poolSize: 3,
    useNewUrlParser: true
    // other options can go here
}, function (err, db) {
    assert.equal(null, err);
    mongodb = db;
});
/////////////////////////////////////////////////////////////////////


app.listen(PORT, () => console.log(`Express server running on port ` + PORT));

process.on('SIGINT', function () {
    mongodb.close(function () {
        console.log("Mongoose connection is disconnected due to application termination");
        process.exit(0);
    });
});