var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
//mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://vikasb:vikasb11@cluster0.kago6la.mongodb.net/detaildata');

var scheema = mongoose.Schema;

var applicationScheema = new scheema({
    resId: Number,
    applicationName: String
}, {collection: 'applications'});
var applicationData = mongoose.model('applications', applicationScheema);

/* Get the raw output data. */
router.get('/', function(req, res, next) {
    applicationData.find({}, {applicationName:1, _id:0})
        .then(function(doc) {
            res.json(doc);
        }).catch(function(err) {
            res.status(400).json(err);
        });
});

/* Get the raw output data. */
router.get('/:applicationName', function(req, res, next) {
    if(req.params.applicationName) {
        applicationData.find({"applicationName": req.params.applicationName})
        .then(function(doc) {
            res.json(doc);
        }).catch(function(err) {
            res.status(400).json(err);
        });
    }
});

module.exports = router;
