var expect = require("chai").expect,
    Main = require('../lib/main');

describe('#core', function () {
    // body...
    
    describe('#main', function() {
        
        it('should be exported successfully', function() {
            expect(Main).to.be.an.instanceOf(Object);
        });
        
        it('should export `Permissions` class', function() {
            expect(Main.Permissions).to.be.an.instanceOf(Function);
        });
        
        it('should export `Builder` class', function() {
            expect(Main.Builder).to.be.an.instanceOf(Function);
        });
        
        it('should export `Adapter` Object', function() {
            expect(Main.Adapter).to.be.an.instanceOf(Object);
        });
        
        it('should exports `Adapter.Redis` class', function() {
            expect(Main.Adapter.Redis).to.be.an.instanceOf(Function);
        })
    });
});