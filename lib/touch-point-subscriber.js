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
var amqp = require('amqp');
var exchangeName  =  'completed_tp';
var queueName = 'completed_tp_queue';
routingKey = "completed_tp" ;


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
try
{
findRules({_id:'completed_tp'},function(err,result){
    if (err)
    {
        console.log(err);
        process.exit(1);
    }
    else
    {
         console.log('%j',result);
        var connection =  amqp.createConnection({host:"127.0.0.1"});
        connection.on('ready',function()
        {
            console.log(2);

            connection.queue("my_queue_name", function(queue){
                console.log('Created queue')
                queue.bind(exchangeName, routingKey);
                queue.subscribe({ack: true}, function (message, headers, deliveryInfo) {






                    var tp =   message.data.toString();
                    console.log("tp:",tp);
                    var tp1 = JSON.parse(tp);
                    console.log('received message %j',tp1);




                    var jsonFind =  helper.getQueryTouchpoint(result[0].rules, tp1);
                   // console.log('_________________________');
                    console.log('jasonfind:' , jsonFind);

                    //console.log ('get subscription');

                    findSubscriptions(jsonFind,function(err,result){
                        if (err)
                        {
                            console.log(err);
                        }
                        console.log('%j',result.length);

                    })


                    queue.shift();
                })
            })



        } )    ;
    }
})
}
catch (e)
{

    console.log(e);
    exit(0);

}
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
