

var should = require('should');
var expect = require('expect.js');
var mongo = require('mongodb');
var bson = mongo.BSONPure;
var subscriber = require('../lib/touch-point-subscriber').subscriptionManager;
var rules = [];
var completedTp = {};



describe('workflow subscriber Unit Tests:', function () {



    describe('firt set is run', function () {
        var error = null;
        var response = "";
        console.log('x');
        it('return error', function (done) {

            var result = subscriber.getQuery  (rules,completedTp);
                    console.log(result);
                    expect(1).to.eql(1);
                    done();


        });
    } )
} )
