const expect = require('chai').expect;
const InstantiableError = require('./instantiable-error');

describe('InstantiableError', function() {
    describe('constructor', function() {
        it('should full message', function() {
            const error = new InstantiableError('test');
            expect(error.message).to.be.equal('(string)"test" not instantiable!');
        });
        
        it('should shortened message', function() {
            const maxLength = 4;
            const error = new InstantiableError('test big message', maxLength);
            expect(error.message).to.be.equal('(string)"test..." not instantiable!');
        });
    });
});