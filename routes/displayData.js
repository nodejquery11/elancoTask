var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();

/* Get the raw output data. */
router.get('/', function(req, res, next) {
    MongoClient.connect('mongodb+srv://vikasb:vikasb11@cluster0.kago6la.mongodb.net/', function(err, db) {
        if (err) throw err;
        var dbo = db.db("detaildata");
        dbo.collection('applications').aggregate([
            { $lookup:
                {
                    from: 'resources',
                    localField: 'resId',
                    foreignField: 'resId',
                    as: 'resource'
                }
            }
        ]).toArray(function(err, doc) {
            if (err) throw err;
            res.json(doc);
            db.close();
        });
    })
});


module.exports = router;
