var expect = require('chai').expect;
var Di = require('./di');

class TestClass {
    constructor() {
        this.rand = Math.random();
    }
};

describe('Di', function() {
    let di;
    
    beforeEach(function() {
        di = new Di();
        di.setService('test', TestClass);
    });
    
    describe('get', function() {
        it('should return TestClass', function() {
            expect(di.get('test')).to.be.instanceOf(TestClass);
        });
        
        it('should return same object', function() {
            expect(di.get('test')).to.be.eql(di.get('test'));
        });
        
        it('should throw error when missing service', function() {
            expect(function() { 
                di.get('missingService');
            }).to.throw(TypeError);
        });
    });
    
    describe('set', function() {
        it('should set up the service', function() {
            di.set('newService', 'service');
            expect(di.get('newService')).to.be.equal('service');
        });
    });
    
    describe('build', function() {
        it('should return TestClass', function() {
            expect(di.build('test')).to.be.instanceOf(TestClass);
        });
        
        it('should return not same object', function() {
            expect(di.build('test')).to.be.not.eql(di.build('test'));
        });
        
        it('should throw error when missing service', function() {
            expect(function() { 
                di.build('missingService');
            }).to.throw(TypeError);
        });
    });
});