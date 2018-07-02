const expect = require('chai').expect;
const Di = require('./di');

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
        di.setFactory('testFactory', function() {});
    });

    describe('set', function() {
        it('should set up the service', function() {
            di.set('newService', 'service');
            expect(di.get('newService')).to.be.equal('service');
        });
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
    
    describe('build', function() {
        it('should return TestClass', function() {
            expect(di.build('test')).to.be.instanceOf(TestClass);
        });
        
        it('should return different object', function() {
            expect(di.build('test')).to.be.not.eql(di.build('test'));
        });
        
        it('should throw error when missing service', function() {
            expect(function() { 
                di.build('missingService');
            }).to.throw(TypeError);
        });
    });
    
    describe('has/hasService/hasFactory', function() {
        it('should service exists', function() {
            di.get('test');
            expect(di.has('test')).to.be.true;
        });
        
        it('should service exists', function() {
            expect(di.hasService('test')).to.be.true;
        });
        
        it('should factory exists', function() {
            expect(di.hasFactory('testFactory')).to.be.true;
        });
    });
    
    describe('getFactory', function() {
        it('should return function', function() {
            expect(di.getFactory('testFactory')).to.be.an('function');
        });
        
        it('should return same anomymous function', function() {
            const anonymousFunction = function() {};
            di.setFactory('newAnonymousFactory', anonymousFunction);
            expect(di.getFactory('newAnonymousFactory')).to.be.eql(anonymousFunction);
        });
    });
    
    describe('create', function() {
        it('should return Di instance', function() {
            expect(Di.create()).to.be.instanceOf(Di);
        });
        
        it('should return Di instance with config', function() {
            const config = {
                services: {
                    'test': TestClass
                }
            };
            const instance = Di.create(config);
            expect(instance.get('test')).to.be.instanceOf(TestClass);
        });
    });
});