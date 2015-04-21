var expect = require("chai").expect,
    Adapter = require('../lib/adapter');

describe('#core', function () {
    // body...
    
    describe('#adapter', function() {
       
       it('should be exported', function () {
           // body...
           expect(Adapter).to.be.ok;
           expect(Adapter).to.be.an.instanceOf(Function);
       });
       
       describe('method', function() {
           
           var adapter;
           beforeEach(function () {
               // body...
               adapter = new Adapter;
           })
           
           describe('#insert', function() {
               
               it('should exists', function() {
                   expect(adapter.insert).to.be.ok;
                   expect(adapter.insert).to.be.an.instanceOf(Function);
               });
           });
           
           describe('#update', function() {
               it('should exists', function() {
                   expect(adapter.update).to.be.an.instanceOf(Function);
               });
           });
           
           describe('#drop', function() {
               it('should exists', function() {
                   expect(adapter.drop).to.be.an.instanceOf(Function);
               });
           });
           
           describe('#findOne', function() {
               it('should exists', function() {
                   expect(adapter.findOne).to.be.an.instanceOf(Function);
               });
           });
           
           describe('#find', function() {
               it('should exists', function() {
                   expect(adapter.find).to.be.an.instanceOf(Function);
               });
           });
       });
    });
});