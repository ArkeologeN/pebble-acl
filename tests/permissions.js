var expect = require("chai").expect,
    Adapter = require('../lib/adapters/redis'),
    Permissions = require('../lib/permissions');

describe('#core', function () {
    // body...
    
    describe('#permissions', function() {
        
        it('should be exported', function() {
            expect(Permissions).to.be.an.instanceOf(Function);
        });
        
        describe('method', function() {
            
            var permissions;
            beforeEach(function() {
                permissions = new Permissions(new Adapter);
            })
           
           describe('#hasAccess', function() {
               
               it('should exists', function() {
                   expect(permissions.hasAccess).to.be.an.instanceOf(Function);
               });
               
               it('should return permissions', function(done) {
                   /**
                    *  According to dummy filling, POST do exists in permissions.
                    *  If you found one and wants to check for false, replace with `HEAD`
                    */
                   permissions.hasAccess('POST', {
                       role: 'admin',
                       resource: 'engineers'
                   }, function(err, ok) {
                       expect(err).to.be.null;
                       console.log(ok);
                       done();
                   });
               });
           }) 
        });
    });
    
});