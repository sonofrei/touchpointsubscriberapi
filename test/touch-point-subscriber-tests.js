

var should = require('should');
var expect = require('expect.js');
var mongo = require('mongodb');
var bson = mongo.BSONPure;
var subscriber = require('../lib/touch-point-subscriber').subscriptionManager;
var helper = require('../lib/subscriber-helper') ;
var rules = [];
var completedTp = {};



describe('Helper Tests:', function () {



    describe('when getQuery is called', function () {
        var error = null;
        var response = "";
        /*
        it('return null when rules array is empty', function (done) {

            var result = helper.getQueryTouchpoint  (rules,completedTp);

                    expect(result).to.eql(undefined);
                    done();


        });
        it('return null when touch point  is empty', function (done) {
           // var rules = [];
            var result = helper.getQueryTouchpoint  ([1,2,3],completedTp);

            expect(result).to.eql(undefined);
            done();


        });
        it('return valid jason when touch point  and rules are passed', function (done) {
             var rules = [{type:'single',attribute:'type',operator:'='},{type:'single',attribute:'subType',operator:'='},{type:'single',attribute:'userId',operator:'='},{type:'single',attribute:'leadQuality',operator:'>'},{type:'single_parent_array_of_objects',arrayAttribute:'contact.externalIds',attribute:'provider',operator:'='}];
             var tp = {
                 _id:1,
                 event_type:'completed_tp',
                 type:'ms',
                 sub_type:'ms_viewed',
                 userId:1,
                 leadQuality:40,
                 contact:{
                     firstName:'Stefan',
                     externalIds:[{provider:'kws',id:'1'},{provider:'tiger',id:2}]
                 }
             };

            var result = helper.getQueryTouchpoint  (rules,tp);

            expect(result).to.not.eql(undefined);
            done();


        });
        */
        it.only('return valid jason when touch point  and rules are passed', function (done) {
            var rules = [{type:'single',attribute:'type',operator:'='},{type:'single',attribute:'subType',operator:'='},{type:'single',attribute:'userId',operator:'='},{type:'single',attribute:'leadQuality',operator:'>'},{type:'single_parent_array_of_objects',arrayAttribute:'contact.externalIds',attribute:'provider',operator:'='}];
            var tp = {
                _id:1,
                event_type:'completed_tp',
                type:'ms',
                subType:'ms_viewed',
                userId:1,
                leadQuality:40,
                contact:{
                    firstName:'Stefan',
                    externalIds:[{provider:'kws',id:'1'},{provider:'tiger',id:2}]
                }
            };

            var result = helper.getQueryTouchpoint  (rules,tp);

            expect(result).to.not.eql(undefined);
            done();


        });
    } )

} )
