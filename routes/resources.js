var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
//mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://vikasb:vikasb11@cluster0.kago6la.mongodb.net/detaildata');

var scheema = mongoose.Schema;

var resourceScheema = new scheema({
    resId: Number,
    resourceName: String
}, {collection: 'resources'});
var resourcesData = mongoose.model('resources', resourceScheema);

/* Get the raw output data. */
router.get('/', function(req, res, next) {
    resourcesData.find({}, {resourceName:1, _id:0})
        .then(function(doc) {
            res.json(doc);
        }).catch(function(err) {
            res.status(400).json(err);
        });
});

/* Get the raw output data. */
router.get('/:resourceName', function(req, res, next) {
    if(req.params.resourceName) {
        resourcesData.find({"resources": req.params.resourceName})
        .then(function(doc) {
            res.json(doc);
        }).catch(function(err) {
            res.status(400).json(err);
        });
    }
});

module.exports = router;
