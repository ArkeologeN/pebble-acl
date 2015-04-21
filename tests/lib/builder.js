var expect = require("chai").expect;

var Builder = require('../../lib/builder'),
    Adapter = require('../../lib/adapters/redis');

describe('#lib', function() {
    
    describe('#builder', function () {
        // body...
        
        it('have been exported', function () {
            expect(require('../../lib/builder')).to.be.an.instanceOf(Function);
        });
        
        it('should raise error for missing adapter', function() {
           try {
               var builder = new Builder;
           } catch (e) {
               expect(e).to.be.an.instanceOf(Error);
           } 
        });
        
        describe('validates', function() {
            
            var builder;
            beforeEach(function () {
                // body...
                builder = new Builder(new Adapter({}));
            })
            
            it('should create an instance of adapter', function() {
                expect(new Builder(new Adapter)).to.be.an.instanceOf(Object);
            });
            
            describe('method: addRole', function() {
                
                it('should exists', function() {
                    expect(builder.addRole).to.be.ok;
                    expect(builder.addRole).to.be.an.instanceOf(Function);
                });
                
                it('should be executed and create `admin` role', function() {
                   
                   builder.addRole('admin', function (err, ok) {
                       expect(err).to.be.an.instanceOf(Error);
                       expect(ok).to.be.ok;
                   });
                });
            });
            
            describe('method: addResources', function() {
                
                it('should exists', function() {
                    expect(builder.addResources).to.be.ok;
                    expect(builder.addResources).to.be.an.instanceOf(Function);
                });
                
                it('should be executed and create `[engineers, dentist, workers]` resources', function(done) {
                    builder.addResources(['engineers', 'dentists', 'workers'], function (err, ok) {
                        expect(err).to.be.null;
                        expect(ok).to.be.ok;
                        done();
                    })
                });
                
            });
            
            describe('method: addResourcesToRoles', function() {
                
                it('should exists', function() {
                    expect(builder.addResourcesToRoles).to.be.an.instanceOf(Function);
                });
                
                it('should be executed and add `resources` against `role', function(done) {
                    var resources = {};
                    resources['engineers'] = ['GET', 'POST', 'PUT', 'DELETE'];
                    resources['dentists'] = ['GET', 'POST'];
                    resources['workers'] = ['GET'];
                    builder.addResourcesToRoles(
                        'admin', 
                        resources, 
                        function(err, ok) {
                        expect(err).to.be.null;
                        expect(ok).to.be.ok;
                        done();
                    });
                });
            });
            
            describe('method: clear', function() {
                this.timeout(20000);
                it('should exists', function() {
                    expect(builder.clear).to.be.ok;
                    expect(builder.clear).to.be.an.instanceOf(Function);
                });
                
                it('should reset the ACL successfully from `db`', function(done) {
                    builder.clear(function(err, ok) {
                        expect(err).to.be.null;
                        expect(ok).to.be.ok;
                        done();
                    })
                })
            });
        });
    });
});