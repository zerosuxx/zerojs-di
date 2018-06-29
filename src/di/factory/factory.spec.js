const expect = require('chai').expect;
const Factory = require('./factory');
const AbstractFactory = require('./abstract-factory');
const InstantiableError = require('./instantiable-error');

class TestArgClass {
    constructor() {
        this._args = arguments;
    }
    
    getArguments() {
        return this._args;
    }
}

describe('Factory', function() {
    let factory = new Factory();
    let container = null;
    
    it('is callable', function() {
        expect(factory).to.be.an('function');
    });
    
    it('instanceof AbstractFactory', function() {
        expect(factory).to.be.instanceOf(AbstractFactory);
    });
    
    describe('call', function() {
        it('should return object', function() {
            expect(factory(container, {})).to.be.an('object');
        });
        
        it('should return different object', function() {
            const testObject = {
                test: 1
            };
            const newObject = factory(container, testObject);
            newObject.test = 2;
            expect(testObject).to.be.not.eql(newObject);
        });
        
        it('should return same anomymous function', function() {
            const anonymousFunction = function() {};
            const newObject = factory(container, anonymousFunction);
            expect(anonymousFunction).to.be.eql(anonymousFunction);
        });
        
        it('should return new object', function() {
            const service = TestArgClass;
            const serviceInstance = factory(container, service);
            expect(serviceInstance).to.be.not.eql(service);
            expect(serviceInstance).to.be.instanceOf(service);
        });
        
        it('should return new object with args', function() {
            const service = TestArgClass;
            const testArgs = [1, 2, 3];
            const serviceInstance = factory(container, service, testArgs);
            testArgs.forEach(function(arg) {
                expect(serviceInstance.getArguments()[arg]).to.be.eql(testArgs[arg]);
            });
        });
        
        it('should throw error when service is not instantiable', function() {
            expect(function() { 
                factory(container, 'not-instantiable');
            }).to.throw(InstantiableError);
        });
        
        it('should throw type error when service is undefined', function() {
            expect(function() { 
                factory(container, undefined);
            }).to.throw(TypeError);
        });
    });
});