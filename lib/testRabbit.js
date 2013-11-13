/**
 * Created by sonofrei on 11/12/13.
 */
var amqp = require('amqp');
var exchangeName  =  'completed_tp';
var queueName = 'completed_tp_queue';
routingKey = "completed_tp" ;

var connection =  amqp.createConnection({host:"127.0.0.1"});

connection.on('ready',function()
    {
        console.log(2);
        connection.queue("my_queue_name", function(queue){
            console.log('Created queue')
            queue.bind(exchangeName, routingKey);
            queue.subscribe({ack: true}, function (message, headers, deliveryInfo) {


                console.log('Recieved a message:');
                console.log('message:' + message.data);
                queue.shift();
            })
        })



    }
)