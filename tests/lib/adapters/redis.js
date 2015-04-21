var expect = require("chai").expect,
    RedisAdapter = require('../../../lib/adapters/redis');

describe('#lib', function () {
    
    describe('#adapters', function() {
        
        describe('#redis', function() {
            
            it('should be exported', function () {
                // body...
                expect(RedisAdapter).to.be.an.instanceOf(Function);
            });
            
            it('should create new object', function() {
                expect(new RedisAdapter).to.be.an.instanceOf(Object);
            })
            
            describe('performs', function() {
                
                var adapter;
                beforeEach(function() {
                    adapter = new RedisAdapter({});
                });
                
                it('insert', function() {
                   expect(adapter.insert).to.be.an.instanceOf(Function); 
                });
            });
        });
    });
});