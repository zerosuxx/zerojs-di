const AbstractFactory = require('./abstract-factory');
const InstantiableError = require('./instantiable-error');

module.exports = class Factory extends AbstractFactory {
    __call__(container, className, args = null) {
        const resolvedClassName = this._resolveClassName(className);
        
        if(typeof resolvedClassName === 'object') {
            return Object.assign({}, resolvedClassName);
        }
        
        return this.build(resolvedClassName, args);
    }
    
    build(className, args = null) {
        try {
            return args ? new className(...args) : new className;
        } catch(ex) {
            throw new InstantiableError(className);
        }
    }
};