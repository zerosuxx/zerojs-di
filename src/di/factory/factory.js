module.exports = class Factory {
    constructor(resolverChain) {
        this._resolverChain = resolverChain;
    }
    
    build(container, className, args) {
        const resolvedClassName = this._resolverChain ? this._resolverChain.resolve(className) : className;
        try {
            return args ? new resolvedClassName(...args) : new resolvedClassName;
        } catch(ex) {
            const type = typeof className;
            const serviceString = className + '';
            const maxLength = 20;
            const msg = `(${type})"${serviceString.substring(0, maxLength)}${serviceString.length > maxLength ? '...' : ''}" not instantiable!`;
            throw new TypeError(msg);
        }
    }
};