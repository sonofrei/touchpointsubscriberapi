var dalHelpers = require('dal-helpers')();
var dbConfig= {
    "hosts": [
        {
            "server": "127.0.0.1",
            "port": 27017
        }
    ],
    database: "test"
};

mongoClientHelper = dalHelpers.mongoClientHelper(dbConfig);
var helper = require('../lib/subscriber-helper') ;
var findRules = function (selector,callback) {

    mongoClientHelper.ensureConnection(function (err, db) {
        if (err) {
            callback(err);
        }
        else {
            db.collection('rules', function (err, collection) {
                collection.find(selector).toArray(function (err, results) {
                    if (err) {
                        callback(err);
                    }
                    else {
                        callback(null, results);
                    }
                });
            });
        }
    });
};

var findSubscriptions = function (selector,callback) {

    mongoClientHelper.ensureConnection(function (err, db) {
        if (err) {
            callback(err);
        }
        else {
            db.collection('subscription2', function (err, collection) {
                collection.find(selector).toArray(function (err, results) {
                    if (err) {
                        callback(err);
                    }
                    else {
                        callback(null, results);
                    }
                });
            });
        }
    });
};

findRules({_id:'completed_tp'},function(err,result){
    if (err)
    {
        console.log(err);
        process.exit(1);
    }
    else
         console.log('%j',result);
        process.exit(1);
})
//var mongoQuery = helper.getQueryTouchpoint  ([1,2,3],{a:1});
//console.log('Mongo Query:%j',mongoQuery);
//findRules(mongoQuery,function(err,result){
//console.log(result);

//});

/*
findSubscriptions(strFind,function(err,result){
    console.log('%j',result);

}) ;

*/
